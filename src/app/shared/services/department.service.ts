import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, catchError, map, throwError } from 'rxjs';
import { environments } from '../../../environments/environments';
import { Department } from '../interfaces/department.interface';
import { Country } from '../interfaces';

@Injectable({
  providedIn: 'root'
})
export class DepartmentService {

  private http = inject(HttpClient);
  private baseUrl: string = `${environments.baseUrl}/departments`;

  constructor() { }

  private get commonOptions(): { headers: HttpHeaders } {
    const authToken = localStorage.getItem('token');
    return {
      headers: new HttpHeaders({
        Authorization: `Bearer ${authToken}`,
      }),
    };
  }

  findAll(): Observable<Department[]> {
    const url = `${this.baseUrl}`;
    return this.http.get<Department[]>(url, this.commonOptions);
  }

  findByName( name: string ): Observable<Department[]> {
    const url = `${this.baseUrl}/name/${name}`;
    return this.http.get<Department[]>(url, this.commonOptions);
  }

  findByCountry( countryId: number ): Observable<Department[]> {
    const url = `${this.baseUrl}/byCountry/${countryId}`;
    return this.http.get<Department[]>(url, this.commonOptions);
  }
}
