// src/app/Services/abonnement.service.ts

import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Abonnement } from '../Interfaces/abonnement';

@Injectable({
  providedIn: 'root'
})
export class AbonnementService {
  private baseUrl = 'http://localhost:8085/abonnement'; // URL de l'API

  constructor(private http: HttpClient) {}

  // Méthode pour obtenir les headers avec le token d'authentification
  private getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('accessToken');
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`,
    });
  }

  // Créer un abonnement pour un client
  createAbonnementForClient(clientId: number, abonnement: Abonnement): Observable<Abonnement> {
    return this.http.post<Abonnement>(`${this.baseUrl}/save/${clientId}`, abonnement, {
      headers: this.getAuthHeaders(),
    });
  }

  // Créer un nouvel abonnement sans client spécifié
  createAbonnement(abonnement: Abonnement): Observable<Abonnement> {
    return this.http.post<Abonnement>(`${this.baseUrl}/new`, abonnement, {
      headers: this.getAuthHeaders(),
    });
  }

  // Récupérer tous les abonnements
  getAllAbonnements(): Observable<Abonnement[]> {
    return this.http.get<Abonnement[]>(`${this.baseUrl}/all`, {
      headers: this.getAuthHeaders(), // Add any authentication if needed
    });
  }
  // Récupérer les abonnements d'une salle par ID
  getAbonnementsBySalle(salleId: number): Observable<Abonnement[]> {
    return this.http.get<Abonnement[]>(`${this.baseUrl}/by-salle/${salleId}`, {
      headers: this.getAuthHeaders(),
    });
  }

  // Récupérer un abonnement par son ID
  getAbonnementById(id: number): Observable<Abonnement> {
    return this.http.get<Abonnement>(`${this.baseUrl}/getOne/${id}`, {
      headers: this.getAuthHeaders(),
    });
  }

  // Mettre à jour un abonnement
  updateAbonnement(id: number, abonnement: Abonnement): Observable<Abonnement> {
    return this.http.put<Abonnement>(`${this.baseUrl}/update/${id}`, abonnement, {
      headers: this.getAuthHeaders(),
    });
  }

  // Supprimer un abonnement
  deleteAbonnement(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/delete/${id}`, {
      headers: this.getAuthHeaders(),
    });
  }
}
