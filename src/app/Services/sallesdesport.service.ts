// salledesport.service.ts

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Salledesport } from '../Interfaces/salledesport';  // Import Salledesport interface

@Injectable({
  providedIn: 'root',
})
export class SalledesportService {
  private baseUrl = 'http://localhost:8085/salledesport';  // Update this as needed

  constructor(private http: HttpClient) {}

  // Create a new Salledesport
  createSalledesport(salledesport: Salledesport): Observable<Salledesport> {
    return this.http.post<Salledesport>(`${this.baseUrl}/save`, salledesport);
  }

  // Get all Sallesdesport
  getAllSallesdesport(): Observable<Salledesport[]> {
    return this.http.get<Salledesport[]>(`${this.baseUrl}/all`);
  }

  // Get a Salledesport by ID
  getSalledesportById(id: number): Observable<Salledesport> {
    return this.http.get<Salledesport>(`${this.baseUrl}/getOne/${id}`);
  }

  // Update a Salledesport
  updateSalledesport(id: number, salledesport: Salledesport): Observable<Salledesport> {
    return this.http.put<Salledesport>(`${this.baseUrl}/update/${id}`, salledesport);
  }

  // Delete a Salledesport by ID
  deleteSalledesport(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/delete/${id}`);
  }
}
