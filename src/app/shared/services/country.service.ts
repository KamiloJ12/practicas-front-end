import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, catchError, map, throwError } from 'rxjs';

import { environments } from '../../../environments/environments';
import { Country } from '../interfaces/country.interface';

@Injectable({
  providedIn: 'root'
})
export class CountryService {

  private http = inject(HttpClient);
  private baseUrl: string = environments.baseUrl;

  constructor() { }

  private get commonOptions(): { headers: HttpHeaders } {
    const authToken = localStorage.getItem('token');
    return {
      headers: new HttpHeaders({
        Authorization: `Bearer ${authToken}`,
      }),
    };
  }

  getCountries(): Observable<Country[]> {
    const url = `${this.baseUrl}/countries`;
    return this.http.get<Country[]>(url, this.commonOptions);
  }

  patchCountry( country: Country ): Observable<boolean> {
    const url = `${this.baseUrl}/countries/${country.id}`;
    return this.http.patch<boolean>(url, { name: country.name }, this.commonOptions)
      .pipe(
        map(() => true),
        catchError(err => throwError(() => err.error.message))
      );
  }

  addCountry( country: Country ): Observable<boolean> {
    const url = `${this.baseUrl}/countries`;
    return this.http.post<Country>(url, { name: country.name }, this.commonOptions)
      .pipe(
        map(() => true),
        catchError(err => throwError(() => err.error.message))
      );
  }

  findByName( name: string ): Observable<Country[]> {
    const url = `${this.baseUrl}/countries/name/${name}`;
    return this.http.get<Country[]>(url, this.commonOptions);
  }

  findById( id: number ): Observable<Country> {
    const url = `${this.baseUrl}/countries/${id}`;
    return this.http.get<Country>(url, this.commonOptions);
  }
}
