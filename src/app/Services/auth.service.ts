import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

interface SignupRequest {
  username: string;
  email: string;
  password: string;
  adresse: string;
  roles?: string[]; 
}

interface LoginRequest {
  username: string;
  password: string;
}

interface JwtResponse {
  accessToken: string;
  refreshToken: string;
  id: number;
  username: string;
  email: string;
  roles: string[];
}

interface MessageResponse {
  message: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private API_SERVER = "http://localhost:8085/api/auth";

  constructor(private httpClient: HttpClient) { }

  // Handle errors
  private handleError(error: HttpErrorResponse) {
    let errorMessage = 'Unknown Error.';
    if (error.error instanceof ErrorEvent) {
      errorMessage = `Error: ${error.error.message}`;
    } else {
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    return throwError(errorMessage);
  }


  // Check if the user is logged in
  isLoggedIn(): boolean {
    return localStorage.getItem('accessToken') !== null;
  }


  // User Signup
  signup(signupRequest: SignupRequest): Observable<MessageResponse> {
    return this.httpClient.post<MessageResponse>(`${this.API_SERVER}/signup`, signupRequest)
      .pipe(catchError(this.handleError));
  }

  // User Login
  signin(loginRequest: LoginRequest): Observable<JwtResponse> {
    return this.httpClient.post<JwtResponse>(`${this.API_SERVER}/signin`, loginRequest)
      .pipe(catchError(this.handleError));
  }


  logout(refreshToken: string): Observable<MessageResponse> {
    return this.httpClient.post<MessageResponse>(`${this.API_SERVER}/logout`, { refreshToken })
      .pipe(catchError(this.handleError));
  }


}
