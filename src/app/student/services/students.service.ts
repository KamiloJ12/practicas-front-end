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

  private get commonOptions(): { headers: HttpHeaders } {
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
    return this.http.get<any[]>(url, this.commonOptions);
  }

  public getUserById(id: number) {
    const url = `${this.baseUrl}/students/${id}`;
    return this.http.get<any>(url, this.commonOptions);
  }
}
