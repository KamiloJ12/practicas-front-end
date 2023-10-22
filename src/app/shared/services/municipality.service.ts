import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, catchError, map, throwError } from 'rxjs';
import { environments } from '../../../environments/environments';
import { Municipality } from '../interfaces/municipality.interfaces';
import { Department } from '../interfaces';

@Injectable({
  providedIn: 'root'
})
export class MunicipalityService {

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

  getMunicipalities(): Observable<Municipality[]> {
    const url = `${this.baseUrl}/municipalities`;
    return this.http.get<Municipality[]>(url, this.commonOptions);
  }

  addMunicipality( municipality: Municipality, department: Department ): Observable<boolean> {
    const url = `${this.baseUrl}/municipalities`;
    const data = { name: municipality.name, department: department.name };
    return this.http.post<Municipality>(url, data, this.commonOptions)
      .pipe(
        map(() => true),
        catchError(err => throwError(() => err.error.message))
      );
  }

  pathMunicipality( municipality: Municipality ): Observable<boolean> {
    const url = `${this.baseUrl}/municipalities/${municipality.id}`;
    return this.http.patch<Department>(url, { name: municipality.name }, this.commonOptions)
      .pipe(
        map(() => true),
        catchError(err => throwError(() => err.error.message))
      );
  }
}
