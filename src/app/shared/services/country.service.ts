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
  private baseUrl: string = `${environments.baseUrl}/countries`;

  constructor() { }

  private get commonOptions(): { headers: HttpHeaders } {
    const authToken = localStorage.getItem('token');
    return {
      headers: new HttpHeaders({
        Authorization: `Bearer ${authToken}`,
      }),
    };
  }

  public findAll(): Observable<Country[]> {
    const url = `${this.baseUrl}`;
    return this.http.get<Country[]>(url, this.commonOptions);
  }

  public findByName( name: string ): Observable<Country[]> {
    const url = `${this.baseUrl}/name/${name}`;
    return this.http.get<Country[]>(url, this.commonOptions);
  }

  public findById( id: number ): Observable<Country> {
    const url = `${this.baseUrl}/${id}`;
    return this.http.get<Country>(url, this.commonOptions);
  }
}
