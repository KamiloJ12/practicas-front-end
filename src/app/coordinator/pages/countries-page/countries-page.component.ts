import { Component, ViewChild, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { MenuItem, MessageService } from 'primeng/api';
import { Menu } from 'primeng/menu';

import { CountryService } from '../../../shared/services/country.service';
import { ValidatorsService } from 'src/app/shared/services';

import { Country } from 'src/app/shared/interfaces';

@Component({
  selector: 'app-countries-page',
  templateUrl: './countries-page.component.html',
  styleUrls: ['./countries-page.component.css'],
  providers: [MessageService],
})
export class CountriesPageComponent {

  @ViewChild('menu', { static: false }) menu!: Menu;
  
  public countries: Country[] = [];
  
  private countryService = inject(CountryService);
  private messageService = inject(MessageService);
  private validatorsService = inject(ValidatorsService);
  private router = inject(Router);

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
    this.loadCountries();

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
        icon: 'pi pi-fw pi-eye',
        command: () => {
          this.router.navigateByUrl(`/coordinator/departments/${this.selectCountry.name}`);
        }
      }
    ]
  }

  loadCountries() {
    this.countryService.getCountries()
      .subscribe({
        next: ( countries: Country[] ) => {
          this.countries = countries;
          this.loading = false;
        },
        error: (error) => {
          this.loading = false;
        }
      });
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
            this.loadCountries();
          },
          error: (error) => this.showMessage('error', error)
        });
    }
    return this.countryService.patchCountry(this.currentCountry)
      .subscribe({
        next: () => {
          this.showMessage('success', 'Se ha actualizado el pais');
          this.countryForm.reset();
          this.loadCountries();
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
