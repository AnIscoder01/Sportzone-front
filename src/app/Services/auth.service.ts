import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

interface SignupRequest {
  username: string;
  email: string;
  password: string;
  adresse: string;
  roles?: string[]; // Optional roles
}

interface LoginRequest {
  username: string;
  password: string;
}

interface JwtResponse {
  token: string;  // 'token' from the response
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
  providedIn: 'root',
})
export class AuthService {
  private readonly API_SERVER = 'http://localhost:8085/api/auth';

  constructor(private httpClient: HttpClient) {}

  // Handle HTTP errors
  private handleError(error: HttpErrorResponse): Observable<never> {
    let errorMessage = 'Unknown Error.';
    if (error.error instanceof ErrorEvent) {
      errorMessage = `Client Error: ${error.error.message}`;
    } else {
      errorMessage = `Server Error: ${error.status} - ${error.message}`;
    }
    return throwError(errorMessage);
  }

  // Check if the user is logged in by checking the presence of 'token'
  isLoggedIn(): boolean {
    return !!localStorage.getItem('token');  // Correct token retrieval
  }

  // Save tokens to localStorage after successful login
  saveTokens(jwtResponse: JwtResponse): void {
    localStorage.setItem('token', jwtResponse.token);  // Save 'token'
    localStorage.setItem('refreshToken', jwtResponse.refreshToken);
    console.log('Tokens saved to localStorage:', jwtResponse);  // Log saved tokens
  }

  // Get current user roles from the JWT token
  getCurrentUserRole(): string[] | null {
    const token = localStorage.getItem('token');  // Retrieve the token
    console.log('Token retrieved from localStorage:', token);
  
    if (!token || token.split('.').length !== 3) {
      console.warn('Invalid token format or no token found');
      return null;  // Return null if token is invalid or missing
    }
  
    try {
      const payload = token.split('.')[1];  // Get the payload part of the JWT
      const decodedPayload = JSON.parse(atob(payload));  // Decode from base64 and parse JSON
      console.log('Decoded Payload:', decodedPayload);
  
      // Check if the roles are available in the decoded payload
      if (!decodedPayload.roles) {
        console.warn('No roles found in token');
        return ['guest'];  // Assign a default role
      }
  
      return decodedPayload.roles || null;  // Return roles if available
    } catch (error) {
      console.error('Error decoding token:', error);
      return null;  // Return null if there's an error decoding the token
    }
  }
  
  

  // User Signup
  signup(signupRequest: SignupRequest): Observable<MessageResponse> {
    return this.httpClient
      .post<MessageResponse>(`${this.API_SERVER}/signup`, signupRequest)
      .pipe(catchError(this.handleError));  // Handle any signup error
  }

  // User Login
  signin(loginRequest: LoginRequest): Observable<JwtResponse> {
    return this.httpClient
      .post<JwtResponse>(`${this.API_SERVER}/signin`, loginRequest)
      .pipe(
        catchError(this.handleError),
        tap((response) => {
          if (response?.token && response?.refreshToken) {
            console.log('Login response:', response);
            this.saveTokens(response);  // Save tokens
            console.log('User roles:', response.roles);  // Log user roles to ensure they're available
          } else {
            console.error('Missing token or refresh token in response');
          }
        })
      );
  }
  

  // User Logout
  logout(refreshToken: string): Observable<MessageResponse> {
    return this.httpClient
      .post<MessageResponse>(`${this.API_SERVER}/logout`, { refreshToken })
      .pipe(
        catchError(this.handleError),  // Handle logout error
        tap(() => {
          localStorage.removeItem('token');  // Remove 'token' from localStorage
          localStorage.removeItem('refreshToken');
          console.log('Tokens removed from localStorage');
        })
      );
  }
}
