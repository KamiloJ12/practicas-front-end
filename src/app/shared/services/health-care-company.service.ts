import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { environments } from 'src/environments/environments';
import { HealthCareCompany } from '../interfaces/health-care-company.interface';

@Injectable({
  providedIn: 'root'
})
export class HealthCareCompanyService {

  private http = inject(HttpClient);
  private baseUrl: string = `${environments.baseUrl}/health-care-companies`;

  constructor() { }

  private get commonOptions(): { headers: HttpHeaders } {
    const authToken = localStorage.getItem('token');
    return {
      headers: new HttpHeaders({
        Authorization: `Bearer ${authToken}`,
      }),
    };
  }

  public findAll(): Observable<HealthCareCompany[]> {
    const url = `${this.baseUrl}`;
    return this.http.get<HealthCareCompany[]>(url, this.commonOptions);
  }
}
