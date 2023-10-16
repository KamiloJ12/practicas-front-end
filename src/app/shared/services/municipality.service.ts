import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, catchError, map, throwError } from 'rxjs';
import { environments } from 'src/environments/environments';
import { Municipality } from '../interfaces/municipality.interfaces';

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

  getSuggestion( name: string, departament: string = '' ): Observable<Municipality[]> {
    const url = `${this.baseUrl}/municipalities/suggestion?name=${name}&department=${departament}`;
    return this.http.get<Municipality[]>(url, this.commonOptions);
  }

  addMunicipality( department: Municipality ): Observable<boolean> {
    const url = `${this.baseUrl}/departments`;
    return this.http.post<Municipality>(url, department, this.commonOptions)
      .pipe(
        map(() => true),
        catchError(err => throwError(() => err.error.message))
      );
  }
}
