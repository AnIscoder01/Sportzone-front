import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders, HttpResponse } from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UtilisateurService {
  
  private API_SERVER = "http://localhost:8081"
  
  constructor(private httpClient: HttpClient) { }

  handleError(error: HttpErrorResponse) {	
    let errorMessage = 'Unknown Error.';
    if (error.error instanceof ErrorEvent) {
      errorMessage = `Error: ${error.error.message}`;
    }
    else {
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
      
    return throwError(errorMessage);
    }

    getAllUsers():Observable<any> {    
      let httpHeaders = new HttpHeaders({
        'Content-Type':  'application/json',
        'Accept':  'application/json',
      });
  
      return this.httpClient.get(this.API_SERVER+"/utilisateur/all", {headers: httpHeaders}).pipe(catchError(this.handleError));
    }


}
