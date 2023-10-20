import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, catchError, map, throwError } from 'rxjs';
import { environments } from 'src/environments/environments';

@Injectable({
  providedIn: 'root'
})
export class EmailConfirmationService {

  private http = inject(HttpClient);
  private baseUrl: string = environments.baseUrl;

  constructor() { }

  private get commonOptions(): { headers: HttpHeaders } {
    const authToken = localStorage.getItem('token');
    console.log(authToken);
    return {
      headers: new HttpHeaders({
        Authorization: `Bearer ${authToken}`,
      }),
    };
  }

  confirm( token: string ): Observable<boolean> {
    const url = `${this.baseUrl}/email-confirmation/confirm`;
    return this.http.post<boolean>(url, { token } ,this.commonOptions)
            .pipe(
              map(() => true),
              catchError(err => throwError(() => err.error.message))
            );
  }

  resendConfirmationLink(): Observable<boolean> {
    const url = `${this.baseUrl}/email-confirmation/resend-confirmation-link`;
    return this.http.post(url, null, this.commonOptions)
            .pipe(
              map(() => true),
              catchError(err => throwError(() => err.error.message))
            );  
  }

}
