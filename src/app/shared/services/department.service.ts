import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, catchError, map, throwError } from 'rxjs';
import { environments } from '../../../environments/environments';
import { Department } from '../interfaces/department.interface';

@Injectable({
  providedIn: 'root'
})
export class DepartmentService {

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

  getDepartments(offset?: number, limit?: number, country?: string,  query?: string): Observable<Department[]> {
    const url = `${this.baseUrl}/departments?query=${query}&offset=${offset}&limit=${limit}&country=${country}`;
    return this.http.get<Department[]>(url, this.commonOptions);
  }

  addDepartment( department: Department ): Observable<boolean> {
    const url = `${this.baseUrl}/departments`;
    const data = { name: department.name, country: department.country?.id };
    return this.http.post<Department>(url, data, this.commonOptions)
      .pipe(
        map(() => true),
        catchError(err => throwError(() => err.error.message))
      );
  }

  pathDepartment( department: Department): Observable<boolean> {
    const url = `${this.baseUrl}/departments/${department.id}`;
    return this.http.patch<Department>(url, { name: department.name }, this.commonOptions)
      .pipe(
        map(() => true),
        catchError(err => throwError(() => err.error.message))
      );
  }
}
