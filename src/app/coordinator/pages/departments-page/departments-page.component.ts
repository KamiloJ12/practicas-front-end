import { Component, ViewChild, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MenuItem, MessageService } from 'primeng/api';
import { Menu } from 'primeng/menu';
import { TableLazyLoadEvent } from 'primeng/table';
import { switchMap } from 'rxjs';
import { Department } from 'src/app/shared/interfaces';
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
  public totalRecords: number = 0;

  private countryService = inject(CountryService);
  private departamentService = inject(DepartmentService);
  private messageService = inject(MessageService);
  private validatorsService = inject(ValidatorsService);
  private activatedRoute = inject(ActivatedRoute);
  private router = inject(Router);

  public search: string = '';
  public currentPage: number = 0;
  public loading = true;
  public showDialog = false;
  public selectDepartment!: Department;
  public items: MenuItem[] | undefined;

  private fb = inject(FormBuilder);

  public departmentForm: FormGroup = this.fb.group({
    id: [null],
    name: ['', [Validators.required]],
    country: [null]
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
      .subscribe( country => {
        if( !country ) {
          this.router.navigateByUrl('/coordinator/countries');
        }
        this.departmentForm.patchValue({ country: country });
      });

    this.onSearch();

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

  loadDepartments(event: TableLazyLoadEvent) {
    this.currentPage = event.first ? event.first : this.currentPage;
    this.departamentService.getDepartments(event.first, event.rows ?? 5, this.currentDepartment.country?.name, this.search,)
      .subscribe({
        next: (departmentsPagination: any) => {
          this.departments = departmentsPagination.items;
          this.totalRecords = departmentsPagination.count;
          this.loading = false;
        },
        error: (error) => {
          this.loading = false;
        }
      });
  }

  onSearch(value: string = '') {
    this.search = value;
    this.loadDepartments({ first: 0, rows: 5 });
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
      return this.departamentService.addDepartment(this.currentDepartment)
        .subscribe({
          next: () => {
            this.showMessage('success', 'Se ha agregado un nuevo departamento');
            this.departmentForm.reset();
            this.loadDepartments({ first: this.currentPage });
          },
          error: (error) => this.showMessage('error', error)
        });
    }
    return this.departamentService.pathDepartment(this.currentDepartment)
      .subscribe({
        next: () => {
          this.showMessage('success', 'Se ha actualizado el departamento');
          this.departmentForm.reset();
          this.loadDepartments({ first: this.currentPage });
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
