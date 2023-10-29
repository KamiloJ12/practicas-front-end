import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { environments } from 'src/environments/environments';
import { ProgrammingLanguages } from '../interfaces/programming-language.interface';

@Injectable({
  providedIn: 'root'
})
export class ProgrammingLanguagesService {

  private http = inject(HttpClient);
  private baseUrl: string = `${environments.baseUrl}/programming-languages`;

  constructor() { }

  private get commonOptions(): { headers: HttpHeaders } {
    const authToken = localStorage.getItem('token');
    return {
      headers: new HttpHeaders({
        Authorization: `Bearer ${authToken}`,
      }),
    };
  }

  findAll(): Observable<ProgrammingLanguages[]> {
    const url = `${this.baseUrl}`;
    return this.http.get<ProgrammingLanguages[]>(url, this.commonOptions);
  }
}