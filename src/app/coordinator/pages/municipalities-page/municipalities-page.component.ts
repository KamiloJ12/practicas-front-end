import { Component, ViewChild, inject } from '@angular/core';
import { Menu } from 'primeng/menu';
import { Department, Municipality } from 'src/app/shared/interfaces';
import { MunicipalityService } from '../../../shared/services/municipality.service';
import { DepartmentService, ValidatorsService } from 'src/app/shared/services';
import { MenuItem, MessageService } from 'primeng/api';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { switchMap } from 'rxjs';

@Component({
  selector: 'app-municipalities-page',
  templateUrl: './municipalities-page.component.html',
  styleUrls: ['./municipalities-page.component.css']
})
export class MunicipalitiesPageComponent {
  @ViewChild('menu', { static: false }) menu!: Menu;

  public municipalities: Municipality[] = [];
  
  private departmentService = inject(DepartmentService);
  private municipalityService = inject(MunicipalityService);
  private messageService = inject(MessageService);
  private validatorsService = inject(ValidatorsService);
  private activatedRoute = inject(ActivatedRoute);
  private router = inject(Router);

  public loading = true;
  public showDialog = false;
  public selectMunicipality!: Municipality;
  public department!: Department;
  public items: MenuItem[] | undefined;

  private fb = inject(FormBuilder);

  public municipalityForm: FormGroup = this.fb.group({
    id: [null],
    name: ['', [Validators.required]],
  });

  get currentMunicipality(): Municipality {
    const municipality = this.municipalityForm.value as Municipality;
    return municipality;
  }

  ngOnInit(): void {
    this.activatedRoute.params
      .pipe(
        switchMap( ({ department }) => this.departmentService.findByName(department) )
      )
      .subscribe( ( departments: Department[] ) => {
        this.department  = departments[0];
        if( !this.department ) {
          this.router.navigateByUrl(`/coordinator/countries`);
        }
        
        this.municipalities = this.department.municipalities;
        this.loading = false;
      });

    this.items = [
      {
        label: 'Editar',
        icon: 'pi pi-fw pi-pencil',
        command: () => {
          this.municipalityForm.reset( this.selectMunicipality );
          this.showDialog = true;
        }
      },
    ];
  }

  loadDepartments() {
    this.departmentService.findByName(this.department.name)
      .subscribe( ( departments: Department[] ) => {
        const department = departments[0];
        this.municipalities = department.municipalities;
        this.loading = false;
      });
  }

  onShowMenu( event: Event, municipality: Municipality ) {
    if (this.menu) {
      this.menu.toggle(event);
      this.selectMunicipality = municipality;
    }
  }

  onShowDialog() {
    this.showDialog = true;
    this.municipalityForm.reset();
  }

  isValidField(field: string) {
    return this.validatorsService.isValidField(this.municipalityForm, field);
  }

  submit() {
    if (this.municipalityForm.invalid)
      return this.municipalityForm.markAllAsTouched();

    if (this.currentMunicipality.id == null) {
      return this.municipalityService.addMunicipality(this.currentMunicipality, this.department )
        .subscribe({
          next: () => {
            this.showMessage('success', 'Se ha agregado un nuevo departamento');
            this.municipalityForm.reset();
            this.loadDepartments();
          },
          error: (error) => this.showMessage('error', error)
        });
    }
    return this.municipalityService.pathMunicipality(this.currentMunicipality)
      .subscribe({
        next: () => {
          this.showMessage('success', 'Se ha actualizado el departamento');
          this.municipalityForm.reset();
          this.loadDepartments();
        },
        error: (error) => this.showMessage('error', error)
      });
  }

  showMessage(severity: string, detail: string, sumary?: string): void {
    this.messageService.add({
      severity: severity,
      summary: sumary,
      detail: detail,
      life: 3000
    });
  }
}
