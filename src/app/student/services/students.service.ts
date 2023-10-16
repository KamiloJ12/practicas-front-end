import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { environments } from 'src/environments/environments';

@Injectable({
  providedIn: 'root'
})
export class StudentsService {

  private http = inject(HttpClient);
  private baseUrl: string = environments.baseUrl;

  constructor() { }

  private getCommonOptions(): { headers: HttpHeaders } {
    const authToken = localStorage.getItem('token'); // Obtener el token del Local Storage

    return {
      headers: new HttpHeaders({
        Authorization: `Bearer ${authToken}`,
        // Otros encabezados comunes si es necesario
      }),
    };
  }

  getStudents(): Observable<any[]> {
    const url = `${this.baseUrl}/students`;
    const options = this.getCommonOptions();

    return this.http.get<any[]>(url, options);
  }
}
