import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, catchError, map, throwError } from 'rxjs';
import { environments } from 'src/environments/environments';
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

  getDepartments(): Observable<Department[]> {
    const url = `${this.baseUrl}/departments`;
    return this.http.get<Department[]>(url, this.commonOptions);
  }

  getSuggestion( name: string, country: string = 'colombia' ): Observable<Department[]> {
    const url = `${this.baseUrl}/departments/suggestion?name=${name}&country=${country}`;
    return this.http.get<Department[]>(url, this.commonOptions);
  }

  addDepartment( department: Department ): Observable<boolean> {
    const url = `${this.baseUrl}/departments`;
    return this.http.post<Department>(url, department, this.commonOptions)
      .pipe(
        map(() => true),
        catchError(err => throwError(() => err.error.message))
      );
  }
}
