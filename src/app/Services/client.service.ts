import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { Client } from '../Interfaces/client';

@Injectable({
  providedIn: 'root'
})
export class ClientService {

  private readonly API_SERVER = 'http://localhost:8081'; 

  private readonly httpHeaders = new HttpHeaders({
    'Content-Type': 'application/json',
    Accept: 'application/json'
  });

  constructor(private httpClient: HttpClient) {}

  private handleError(error: HttpErrorResponse): Observable<never> {
    let errorMessage = 'Unknown Error.';
    if (error.error instanceof ErrorEvent) {
      errorMessage = `Error: ${error.error.message}`;
    } else {
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.error(errorMessage); 
    return throwError(errorMessage);
  }

  /**
   * Fetch list of users
   * @returns Observable of user list
   */ 
  getUserList(): Observable<Client[]> {
  return this.httpClient
  .get<Client[]>(`${this.API_SERVER}/client/all`, { headers: this.httpHeaders })
  .pipe(catchError(this.handleError));
}


}
