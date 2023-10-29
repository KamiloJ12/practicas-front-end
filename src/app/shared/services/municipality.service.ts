import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, catchError, map, throwError } from 'rxjs';
import { environments } from '../../../environments/environments';
import { Municipality } from '../interfaces/municipality.interfaces';

@Injectable({
  providedIn: 'root'
})
export class MunicipalityService {

  private http = inject(HttpClient);
  private baseUrl: string = `${environments.baseUrl}/municipalities`;

  constructor() { }

  private get commonOptions(): { headers: HttpHeaders } {
    const authToken = localStorage.getItem('token');
    return {
      headers: new HttpHeaders({
        Authorization: `Bearer ${authToken}`,
      }),
    };
  }

  findAll(): Observable<Municipality[]> {
    const url = `${this.baseUrl}`;
    return this.http.get<Municipality[]>(url, this.commonOptions);
  }

  findByDepartment( departmentId: number ):  Observable<Municipality[]> {
    const url = `${this.baseUrl}/byDepartment/${departmentId}`;
    return this.http.get<Municipality[]>(url, this.commonOptions);
  }
}
