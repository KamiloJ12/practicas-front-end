import { Component, inject } from '@angular/core';

import { TableLazyLoadEvent } from 'primeng/table';
import { Country } from 'src/app/shared/interfaces';
import { CountryService } from '../../../shared/services/country.service';

@Component({
  selector: 'app-countries-page',
  templateUrl: './countries-page.component.html',
  styleUrls: ['./countries-page.component.css']
})
export class CountriesPageComponent {
  public countries: Country[] = [];
  public totalRecords: number = 0;
  private countryService = inject( CountryService );
  public loading = true;

  public search: string | undefined = '';

  ngOnInit(): void {
    this.onSearch();
  }

  loadCountries(event: TableLazyLoadEvent) {
    this.countryService.getCountries(event.first, event.rows ?? 5, this.search)
      .subscribe( countries => {
        this.countries = countries.items;
        this.totalRecords = countries.count; 
      }); 
    this.loading = false;
  }

  onSearch() {
    this.countryService.getCountries(0, 5, this.search)
      .subscribe( countriesPagination => {
        this.countries = countriesPagination.items,
        this.totalRecords = countriesPagination.count
      });
    this.loading = false;
  }
}
