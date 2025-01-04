import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SalledesportService } from '../../Services/sallesdesport.service';
import { Salledesport } from '../../Interfaces/salledesport';
import { Router } from '@angular/router';

@Component({
  selector: 'app-salle-detail',
  templateUrl: './salle-detail.component.html',
  styleUrls: ['./salle-detail.component.css']
})
export class SalleDetailComponent implements OnInit {
  salle: Salledesport | null = null;
  loading: boolean = false;
  errorMessage: string | null = null;

  constructor(
    private route: ActivatedRoute,
    private salleService: SalledesportService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadSalleDetail();
  }

  loadSalleDetail(): void {
    const id = this.route.snapshot.paramMap.get('id'); // Retrieve ID from URL
    if (id) {
      this.loading = true;
      this.salleService.getSalledesportById(+id).subscribe({
        next: (response) => {
          this.salle = response; // Assuming response has been typed as 'Salledesport'
          this.loading = false;
        },
        error: (err) => {
          this.errorMessage = `Erreur lors du chargement des détails de la salle : ${err.message}`;
          this.loading = false;
        }
      });
    } else {
      this.errorMessage = "Aucun ID trouvé dans l'URL.";
    }
  }

  goBack(): void {
    this.router.navigate(['/salledesport']);
  }
}
