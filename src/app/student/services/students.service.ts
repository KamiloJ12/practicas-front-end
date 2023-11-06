import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { environments } from 'src/environments/environments';

@Injectable({
  providedIn: 'root'
})
export class StudentsService {

  private http = inject(HttpClient);
  private baseUrl: string = `${environments.baseUrl}/students`;

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

  public createStudent(data: any) {
    const url = `${this.baseUrl}`;
    return this.http.post(url, data, this.commonOptions);
  }

  public getStudents(): Observable<any[]> {
    const url = `${this.baseUrl}`;
    return this.http.get<any[]>(url, this.commonOptions);
  }

  public getStudentsInPractices(): Observable<any[]> {
    const url = `${this.baseUrl}/practices`;
    return this.http.get<any[]>(url, this.commonOptions);
  }

  public getUstudenById(id: number) {
    const url = `${this.baseUrl}/${id}`;
    return this.http.get<any>(url, this.commonOptions);
  }
}
