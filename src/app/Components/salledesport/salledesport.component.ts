import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { SalledesportService } from '../../Services/sallesdesport.service';
import { Salledesport } from '../../Interfaces/salledesport';
import { AuthService } from '../../Services/auth.service';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { AbonnementService } from '../../Services/abonnement.service';
import { Abonnement } from '../../Interfaces/abonnement';

@Component({
  selector: 'app-salles-sport',
  standalone: true,
  imports: [FormsModule, CommonModule,RouterModule],
  templateUrl: './salledesport.component.html',
  styleUrls: ['./salledesport.component.css']
})
export class SallesSportComponent implements OnInit {
  userRole: string = ''; // Role of the current user
  sallesdesport: Salledesport[] = [];
  newSalledesport: Salledesport = {
    nomSalle: '',
    adresse: '',
    numTel: '',
    heureOuverture: '',
    heureFermeture: '',
  };
  imageList: string[] = [
    'assets/img/s1.jpg', 'assets/img/s2.jpg', 'assets/img/s3.jpg',
    'assets/img/s4.jpg', 'assets/img/s5.jpg', 'assets/img/image6.jpg'
  ];
  editSalledesport: Salledesport | null = null;
  loading: boolean = false;
  errorMessage: string | null = null;



  // Add this property to track the current salle for abonnement creation
  selectedSalleId: number | null = null;

  newAbonnement: Abonnement = {
    id: 0,
    nom: '',
    type: '',
    description: '',
    prix: 0,
    dateDebut: '',
    dateFin: '',
    client: {
      id: 0, // This should be fetched from the logged-in user's details
      username: '',
      email: ''
    }
  };


  

  constructor(
    private salleService: SalledesportService,
    private abonnementService: AbonnementService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadUserRole();
    this.loadSalles();
  }

  showMode(salle: Salledesport): void {
    const details = `
      Nom de la salle: ${salle.nomSalle}
      Adresse: ${salle.adresse}
      Numéro de téléphone: ${salle.numTel}
      Heures d'ouverture: ${salle.heureOuverture}
      Heures de fermeture: ${salle.heureFermeture}
    `;
    alert(details);
  }

  // Load user role from localStorage
  loadUserRole(): void {
    const storedRole = localStorage.getItem('userRole');
    this.userRole = storedRole ? storedRole : 'guest';
    console.log('Loaded user role:', this.userRole);
  }

  goToSalleDetail(id: number): void {
    this.router.navigate([`/salledesport/${id}`]);
  }

  loadSalles(): void {
    this.loading = true;

    if (this.userRole === 'ROLE_USER') {
    this.salleService.getAllSallesdesport().subscribe({
      next: (salles) => {
        // Assigner une image à chaque salle en fonction de l'index
        this.sallesdesport = salles.map((salle, index) => ({
          ...salle,
          imageUrl: this.imageList[index % this.imageList.length] // Utiliser un index cyclique
        }));
        this.loading = false;
      },
      error: (err: HttpErrorResponse) => {
        this.errorMessage = `Error fetching sallesdesport: ${err.message}`;
        this.loading = false;
      }
    });
  }
  if (this.userRole === 'ROLE_OWNER') {
    this.salleService.getMySalles().subscribe({
      next: (salles) => {
        // Assigner une image à chaque salle en fonction de l'index
        this.sallesdesport = salles.map((salle, index) => ({
          ...salle,
          imageUrl: this.imageList[index % this.imageList.length] // Utiliser un index cyclique
        }));
        this.loading = false;
      },
      error: (err: HttpErrorResponse) => {
        this.errorMessage = `Error fetching sallesdesport: ${err.message}`;
        this.loading = false;
      }
    });
  }
  


  }


    // Close form
    closeAbonnementForm(): void {
      this.selectedSalleId = null;
    }

    
 
// Open form for adding abonnement for a specific salle
  // Submit the abonnement form
  addAbonnement(): void {
    if (this.selectedSalleId) {
      this.abonnementService.createAbonnementForSalle(this.selectedSalleId, this.newAbonnement).subscribe({
        next: (response) => {
          alert('Abonnement added successfully!');
          this.closeAbonnementForm();
        },
        error: (err) => {
          alert(`Error creating abonnement: ${err.message}`);
        }
      });
    }}

  // Add new sports hall
  addSalledesport(): void {
    if (this.userRole === 'ROLE_OWNER') {
      this.loading = true;
      this.salleService.createSalledesport(this.newSalledesport).subscribe({
        next: (response) => {
          this.sallesdesport.push(response);
          this.newSalledesport = { nomSalle: '', adresse: '', numTel: '', heureOuverture: '', heureFermeture: '' };
          alert('Salle added successfully!');
        },
        error: (err: HttpErrorResponse) => {
          this.errorMessage = `Error adding salle: ${err.message}`;
        },
        complete: () => (this.loading = false)
      });
    } else {
      alert('You must be an OWNER to add a salle.');
    }
  }


  // Edit sports hall
  editMode(salle: Salledesport): void {
    if (this.userRole === 'ROLE_OWNER') {
      this.editSalledesport = { ...salle };
    } else {
      alert('You must be an OWNER to edit a salle.');
    }
  }


  saveEdit(): void {
    if (this.editSalledesport) {
      this.loading = true;
      this.salleService.updateSalledesport(this.editSalledesport.id!, this.editSalledesport).subscribe({
        next: (updatedSalle) => {
          const index = this.sallesdesport.findIndex(salle => salle.id === updatedSalle.id);
          if (index > -1) {
            this.sallesdesport[index] = updatedSalle;
          }
          this.editSalledesport = null;
          alert('Salle updated successfully!');
        },
        error: (err: HttpErrorResponse) => {
          this.errorMessage = `Error saving edits: ${err.message}`;
        },
        complete: () => (this.loading = false)
      });
    }
  }

  openModal(salleId: number) {
    this.selectedSalleId = salleId; // Set the selected salle ID when the image is clicked
  }

  deleteSalledesport(id: number): void {
    if (this.userRole === 'ROLE_OWNER') {
      if (confirm('Are you sure you want to delete this sports hall?')) {
        this.loading = true;
        this.salleService.deleteSalledesport(id).subscribe({
          next: () => {
            this.sallesdesport = this.sallesdesport.filter(salle => salle.id !== id);
            alert('Salle deleted successfully!');
          },
          error: (err: HttpErrorResponse) => {
            this.errorMessage = `Error deleting salle: ${err.message}`;
          },
          complete: () => (this.loading = false)
        });
      }
    } else {
      alert('You must be an OWNER to delete a salle.');
    }
  }
}