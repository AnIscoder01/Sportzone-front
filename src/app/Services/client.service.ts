import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { Client } from '../Interfaces/client';

@Injectable({
  providedIn: 'root'
})
export class ClientService {

  private API_SERVER = 'http://localhost:8081'; 


  constructor(private httpClient: HttpClient) {}


  private httpHeaders = new HttpHeaders({
    'Content-Type': 'application/json',
    Accept: 'application/json'
  });


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

  getUserList(): Observable<any> {
    return this.httpClient.get<Client[]>(`${this.API_SERVER}/client/all`, { headers: this.httpHeaders })
      .pipe(catchError(this.handleError));
  }



}
