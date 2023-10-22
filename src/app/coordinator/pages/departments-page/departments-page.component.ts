import { Component, ViewChild, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MenuItem, MessageService } from 'primeng/api';
import { Menu } from 'primeng/menu';
import { TableLazyLoadEvent } from 'primeng/table';
import { switchMap } from 'rxjs';
import { Country, Department } from 'src/app/shared/interfaces';
import { DepartmentService, ValidatorsService } from 'src/app/shared/services';
import { CountryService } from '../../../shared/services/country.service';

@Component({
  selector: 'app-departments-page',
  templateUrl: './departments-page.component.html',
  styleUrls: ['./departments-page.component.css'],
  providers: [MessageService],
})
export class DepartmentsPageComponent {

  @ViewChild('menu', { static: false }) menu!: Menu;

  public departments: Department[] = [];
  
  private countryService = inject(CountryService);
  private departamentService = inject(DepartmentService);
  private messageService = inject(MessageService);
  private validatorsService = inject(ValidatorsService);
  private activatedRoute = inject(ActivatedRoute);
  private router = inject(Router);

  public loading = true;
  public showDialog = false;
  public selectDepartment!: Department;
  public country!: Country;
  public items: MenuItem[] | undefined;

  private fb = inject(FormBuilder);

  public departmentForm: FormGroup = this.fb.group({
    id: [null],
    name: ['', [Validators.required]],
  });

  get currentDepartment(): Department {
    const department = this.departmentForm.value as Department;
    return department;
  }

  ngOnInit(): void {
    this.activatedRoute.params
      .pipe(
        switchMap( ({ country }) => this.countryService.findByName(country) )
      )
      .subscribe( ( countries: Country[] ) => {
        this.country  = countries[0];
        if( !this.country ) {
          this.router.navigateByUrl('/coordinator/countries');
        }
        
        this.departments = this.country.departments;
        this.loading = false;
      });

    this.items = [
      {
        label: 'Editar',
        icon: 'pi pi-fw pi-pencil',
        command: () => {
          this.departmentForm.reset( this.selectDepartment );
          this.showDialog = true;
        }
      },
      {
        label: 'Ver',
        icon: 'pi pi-fw pi-eye'
      }
    ];
  }

  loadDepartments() {
    this.countryService.findByName(this.country.name)
      .subscribe( ( countries: Country[] ) => {
        const country = countries[0];
        this.departments = country.departments;
        this.loading = false;
      });
  }

  onShowMenu( event: Event, department: Department ) {
    if (this.menu) {
      this.menu.toggle(event);
      this.selectDepartment = department;
    }
  }

  onShowDialog() {
    this.showDialog = true;
    this.departmentForm.reset();
  }

  isValidField(field: string) {
    return this.validatorsService.isValidField(this.departmentForm, field);
  }

  submit() {
    if (this.departmentForm.invalid)
      return this.departmentForm.markAllAsTouched();

    if (this.currentDepartment.id == null) {
      return this.departamentService.addDepartment(this.currentDepartment, this.country )
        .subscribe({
          next: () => {
            this.showMessage('success', 'Se ha agregado un nuevo departamento');
            this.departmentForm.reset();
            this.loadDepartments();
          },
          error: (error) => this.showMessage('error', error)
        });
    }
    return this.departamentService.pathDepartment(this.currentDepartment)
      .subscribe({
        next: () => {
          this.showMessage('success', 'Se ha actualizado el departamento');
          this.departmentForm.reset();
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
