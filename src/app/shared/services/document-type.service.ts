import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { environments } from '../../../environments/environments';
import { DocumentType } from '../interfaces';

@Injectable({
  providedIn: 'root'
})
export class DocumentTypeService {

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

  getDocumentsType(): Observable<DocumentType[]> {
    const url = `${this.baseUrl}/document-type`;
    return this.http.get<DocumentType[]>(url, this.commonOptions);
  }
}
