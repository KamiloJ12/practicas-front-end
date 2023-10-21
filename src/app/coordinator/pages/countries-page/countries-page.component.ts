import { Component, ViewChild, inject } from '@angular/core';

import { TableLazyLoadEvent } from 'primeng/table';
import { Country, CountryPagination } from 'src/app/shared/interfaces';
import { CountryService } from '../../../shared/services/country.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MenuItem, MessageService } from 'primeng/api';
import { ValidatorsService } from 'src/app/shared/services';
import { Menu } from 'primeng/menu';

@Component({
  selector: 'app-countries-page',
  templateUrl: './countries-page.component.html',
  styleUrls: ['./countries-page.component.css'],
  providers: [MessageService],
})
export class CountriesPageComponent {

  @ViewChild('menu', { static: false }) menu!: Menu;

  public countries: Country[] = [];
  public totalRecords: number = 0;

  private countryService = inject(CountryService);
  private messageService = inject(MessageService);
  private validatorsService = inject(ValidatorsService);

  public search: string = '';
  public currentPage: number = 0;
  public loading = true;
  public showDialog = false;
  public selectCountry!: Country;
  public items: MenuItem[] | undefined;

  private fb = inject(FormBuilder);

  public countryForm: FormGroup = this.fb.group({
    id: [null],
    name: ['', [Validators.required]],
  });

  get currentCountry(): Country {
    const country = this.countryForm.value as Country;
    return country;
  }

  ngOnInit(): void {
    this.onSearch();

    this.items = [
      {
        label: 'Editar',
        icon: 'pi pi-fw pi-pencil',
        command: () => {
          this.countryForm.reset( this.selectCountry );
          this.showDialog = true;
        }
      },
      {
        label: 'Ver',
        icon: 'pi pi-fw pi-eye'
      }
    ]
  }

  loadCountries(event: TableLazyLoadEvent) {
    this.currentPage = event.first ? event.first : this.currentPage;
    this.countryService.getCountries(event.first, event.rows ?? 5, this.search)
      .subscribe({
        next: (countriesPagination: CountryPagination) => {
          this.countries = countriesPagination.items;
          this.totalRecords = countriesPagination.count;
          this.loading = false;
        },
        error: (error) => {
          this.loading = false;
        }
      });
  }

  onSearch(value: string = '') {
    this.search = value;
    this.loadCountries({ first: 0, rows: 5 });
  }

  onShowMenu( event: Event, country: Country ) {
    if (this.menu) {
      this.menu.toggle(event);
      this.selectCountry = country;
    }
  }

  onShowDialog() {
    this.showDialog = true;
    this.countryForm.reset();
  }

  isValidField(field: string) {
    return this.validatorsService.isValidField(this.countryForm, field);
  }

  submit() {
    if (this.countryForm.invalid)
      return this.countryForm.markAllAsTouched();

    if (this.currentCountry.id == null) {
      return this.countryService.addCountry(this.currentCountry)
        .subscribe({
          next: () => {
            this.showMessage('success', 'Se ha agregado un nuevo pais');
            this.countryForm.reset();
            this.loadCountries({ first: this.currentPage });
          },
          error: (error) => this.showMessage('error', error)
        });
    }
    return this.countryService.patchCountry(this.currentCountry)
      .subscribe({
        next: () => {
          this.showMessage('success', 'Se ha actualizado el pais');
          this.countryForm.reset();
          this.loadCountries({ first: this.currentPage });
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
