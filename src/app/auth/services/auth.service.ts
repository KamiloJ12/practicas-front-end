import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, computed, inject, signal } from '@angular/core';
import { Observable, catchError, map, of, tap, throwError } from 'rxjs';

import { environments } from 'src/environments/environments';
import { AuthStatus, CheckTokenResponse, LoginResponse, User } from '../interfaces';

@Injectable({ providedIn: 'root' })
export class AuthService {

    private http = inject(HttpClient);
    private baseUrl: string = environments.baseUrl;

    private _currentUser = signal<User | null>(null);
    private _authStatus = signal<AuthStatus>(AuthStatus.checking);

    public currentUser = computed(() => this._currentUser());
    public authStatus = computed(() => this._authStatus());

    constructor() {
        this.checkAuthStatus().subscribe();
    }

    private setAuthentication(user: User, token: string): boolean {
        this._currentUser.set(user);
        this._authStatus.set(AuthStatus.authenticated);
        localStorage.setItem('token', token);
        return true;
    }

    login(email: string, password: string): Observable<boolean> {
        const url = `${this.baseUrl}/auth/login`;
        const body = { email, password };

        return this.http.post<LoginResponse>(url, body)
            .pipe(
                map(({ user, access_token }) => this.setAuthentication(user, access_token)),
                catchError(err => throwError(() => err.error.message))
            );
    }

    checkAuthStatus(): Observable<boolean> {
        const url = `${this.baseUrl}/auth/check-token`;
        const token = localStorage.getItem('token');

        if (!token) {
            this.logout();
            return of(false);
        }

        const headers = new HttpHeaders()
            .set('Authorization', `Bearer ${token}`);

        return this.http.get<CheckTokenResponse>(url, { headers })
            .pipe(
                map(({ user, access_token }) => this.setAuthentication(user, access_token)),
                catchError((error) => {
                    this._authStatus.set(AuthStatus.notAuthenticated);
                    return of(false);
                })
            );
    }

    register(email: string, password: string): Observable<boolean> {
        const url = `${this.baseUrl}/auth/signup`;
        const body = { email, password };

        return this.http.post<LoginResponse>(url, body)
            .pipe(
                map(({ user, access_token }) => this.setAuthentication(user, access_token)),
                catchError(err => throwError(() => err.error.message))
            );
    }

    requestResetPassword(email: string): Observable<boolean> {
        const url = `${this.baseUrl}/auth/request-password-reset`;
        const body = { email };

        return this.http.post<LoginResponse>(url, body)
            .pipe(
                map(() => true),
                catchError(err => throwError(() => err.error.message))
            );
    }

    resetPassword(password: string, token: string): Observable<boolean> {
        const url = `${this.baseUrl}/auth/reset-password-token`;
        const body = { newPassword: password, token };

        return this.http.patch(url, body)
            .pipe(
                map(() => true),
                catchError(err => throwError(() => err.error.message))
            );
    }

    logout() {
        localStorage.removeItem('token');
        this._currentUser.set(null);
        this._authStatus.set(AuthStatus.notAuthenticated);
    }
}
