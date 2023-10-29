import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { environments } from 'src/environments/environments';

@Injectable({
  providedIn: 'root'
})
export class AffiliationTypeService {

  private http = inject(HttpClient);
  private baseUrl: string = `${environments.baseUrl}/affiliation-type`;

  constructor() { }

  private get commonOptions(): { headers: HttpHeaders } {
    const authToken = localStorage.getItem('token');
    return {
      headers: new HttpHeaders({
        Authorization: `Bearer ${authToken}`,
      }),
    };
  }

  public findAll(): Observable<any[]> {
    const url = `${this.baseUrl}`;
    return this.http.get<any[]>(url, this.commonOptions);
  }
}
