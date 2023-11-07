import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { environments } from 'src/environments/environments';

@Injectable({
  providedIn: 'root'
})
export class AllowedUsersService {

  private http = inject(HttpClient);
  private baseUrl: string = `${environments.baseUrl}/allowed-users`;

  constructor() { }

  private get commonOptions(): { headers: HttpHeaders } {
    const authToken = localStorage.getItem('token');
    return {
      headers: new HttpHeaders({
        Authorization: `Bearer ${authToken}`,
      }),
    };
  }

  public addStudents(formData: FormData): Observable<any> {
    const url = `${this.baseUrl}/students`;
    return this.http.post<any>(url, formData, this.commonOptions);
  }
}
