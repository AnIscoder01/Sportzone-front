import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SalledesportService } from '../../Services/sallesdesport.service';
import { Salledesport } from '../../Interfaces/salledesport';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-detailsalle',
  standalone: true,
  imports: [FormsModule, CommonModule,RouterModule],
  templateUrl: './detailsalle.component.html',
  styleUrls: ['./detailsalle.component.css']
})
export class DetailsalleComponent implements OnInit {
  salle: Salledesport | null = null;

  constructor(
    private route: ActivatedRoute,
    private salleService: SalledesportService
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id'); // Get the ID from the URL
    if (id) {
      this.loadSalleDetails(+id); // Convert ID to a number
    }
  }

  loadSalleDetails(id: number): void {
    this.salleService.getSalledesportById(id).subscribe({
      next: (salle) => {
        this.salle = salle;
      },
      error: (err) => {
        if (err.status === 401) {
          console.error('Unauthorized access, redirecting to login.');
          // Redirect to login or show an appropriate error message
        } else {
          console.error('Error fetching salle details:', err);
        }
      }
    });
  }
  
}
