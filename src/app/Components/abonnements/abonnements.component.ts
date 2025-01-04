import { Component, OnInit } from '@angular/core';
import { AbonnementService } from '../../Services/abonnement.service';
import { Abonnement } from '../../Interfaces/abonnement';
import { HttpErrorResponse } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-abonnements',
  standalone: true,
  imports: [FormsModule,CommonModule],
  templateUrl: './abonnements.component.html',
  styleUrl: './abonnements.component.css'
})
export class AbonnementComponent implements OnInit {
  abonnements: Abonnement[] = [];

  constructor(private abonnementService: AbonnementService) {}

  ngOnInit(): void {
    this.loadAbonnements();
  }
  loadAbonnements(): void {
    this.abonnementService.getAllAbonnements().subscribe({
      next: (data: Abonnement[]) => { 
        this.abonnements = data;
      },
      error: (err: HttpErrorResponse) => {  // Explicitly type 'err' as HttpErrorResponse
        console.error('Error loading abonnements:', err.message);
      },
    });
  }


  subscribe(abonnement: any): void {
    // Add logic to handle the subscription here
    console.log('Subscribed to:', abonnement);
    alert(`Subscribed to: ${abonnement.nom}`);
  }
}
