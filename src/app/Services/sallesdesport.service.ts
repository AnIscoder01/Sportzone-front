import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Salledesport } from '../Interfaces/salledesport';

@Injectable({
  providedIn: 'root',
})
export class SalledesportService {
  private baseUrl = 'http://localhost:8085/salledesport'; // URL de l'API

  constructor(private http: HttpClient) {}

  // Méthode pour obtenir les headers avec le token d'authentification
  private getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('accessToken');
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`,
    });
  }

  // Récupérer les salles créées par l'OWNER connecté
  getMySalles(): Observable<Salledesport[]> {
    return this.http.get<Salledesport[]>(`${this.baseUrl}/my-salles`, {
      headers: this.getAuthHeaders(),
    });
  }

  // Créer une nouvelle salle de sport
  createSalledesport(salledesport: Salledesport): Observable<Salledesport> {
    return this.http.post<Salledesport>(`${this.baseUrl}/save`, salledesport, {
      headers: this.getAuthHeaders(),
    });
  }

  // Récupérer toutes les salles de sport
  getAllSallesdesport(): Observable<Salledesport[]> {
    return this.http.get<Salledesport[]>(`${this.baseUrl}/all`, {
      headers: this.getAuthHeaders(),
    });
  }

  // Récupérer une salle de sport par son ID
  getSalledesportById(id: number): Observable<Salledesport> {
    return this.http.get<Salledesport>(`${this.baseUrl}/getOne/${id}`, {
      headers: this.getAuthHeaders(),
    });
  }

  // Mettre à jour une salle de sport
  updateSalledesport(
    id: number,
    salledesport: Salledesport
  ): Observable<Salledesport> {
    return this.http.put<Salledesport>(
      `${this.baseUrl}/update/${id}`,
      salledesport,
      {
        headers: this.getAuthHeaders(),
      }
    );
  }

  // Supprimer une salle de sport par son ID
  deleteSalledesport(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/delete/${id}`, {
      headers: this.getAuthHeaders(),
    });
  }
}
