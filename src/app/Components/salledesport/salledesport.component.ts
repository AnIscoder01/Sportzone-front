import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms'; // For form handling
import { CommonModule } from '@angular/common'; // For Angular directives like *ngFor, *ngIf
import { SalledesportService } from '../../Services/sallesdesport.service';
import { Salledesport } from '../../Interfaces/salledesport';
import { AuthService } from '../../Services/auth.service'; // Import AuthService

@Component({
  selector: 'app-salles-sport',
  standalone: true,
  imports: [FormsModule, CommonModule], // Include CommonModule here
  templateUrl: './salledesport.component.html',
  styleUrls: ['./salledesport.component.css']
})
export class SallesSportComponent implements OnInit {
  userRole: string = '';  // Variable to hold user role
  sallesdesport: Salledesport[] = [];
  newSalledesport: Salledesport = { 
    nomSalle: '', 
    adresse: '', 
    numTel: '', 
    heureOuverture: '', 
    heureFermeture: '' 
  };  
  editSalledesport: Salledesport | null = null;  
  loading: boolean = false;  // To manage loading state

  // Inject AuthService into the constructor
  constructor(private salleService: SalledesportService, private authService: AuthService) { }

  ngOnInit(): void {
    this.loadUserRole();
    this.loadSalles();
  }

  // Method to load the user role from AuthService
  loadUserRole(): void {
    const storedRole = localStorage.getItem('userRole');  // Retrieve userRole directly from localStorage
    if (storedRole) {
      this.userRole = storedRole;  // Assign the stored role to userRole
      console.log('User role retrieved from localStorage:', this.userRole);
    } else {
      this.userRole = 'guest';  // Default to 'guest' if no userRole is found
      console.log('No user role found in localStorage, user is a guest');
    }
  }
  
  
  // Method to load all sports halls (sallesdesport)
  loadSalles(): void {
    this.loading = true;  // Set loading state to true
    this.salleService.getAllSallesdesport().subscribe(
      (salles) => {
        this.sallesdesport = salles;  // Assign the data to the component's property
        this.loading = false;  // Set loading state to false once data is fetched
      },
      (error) => {
        console.error('Error fetching sallesdesport:', error); // Log errors
        this.loading = false;  // Stop loading state even in case of error
      }
    );
  }

  // Method to add a new sports hall (salledesport) - Only accessible to 'ROLE_OWNER'
  addSalledesport(): void {
    if (this.userRole === 'ROLE_OWNER') {
      this.salleService.createSalledesport(this.newSalledesport).subscribe(
        (response) => {
          this.sallesdesport.push(response);  // Add the new salle to the list
          this.newSalledesport = { // Reset form
            nomSalle: '', 
            adresse: '', 
            numTel: '', 
            heureOuverture: '', 
            heureFermeture: ''
          };
        },
        (error) => {
          console.error('Error adding salle:', error);  // Log any error
          alert('Error adding salle. Please try again.');
        }
      );
    } else {
      alert('Vous devez être un propriétaire pour ajouter une salle.');
    }
  }

  // Method to toggle edit mode for a sports hall - Only accessible to 'ROLE_OWNER'
  editMode(salle: Salledesport): void {
    if (this.userRole === 'ROLE_OWNER') {
      this.editSalledesport = { ...salle };  // Start editing the selected salle
    } else {
      alert('Vous devez être un propriétaire pour modifier une salle.');
    }
  }

  // Method to save edits made to a sports hall - Only accessible to 'ROLE_OWNER'
  saveEdit(): void {
    if (this.editSalledesport) {
      this.salleService.updateSalledesport(this.editSalledesport.id!, this.editSalledesport).subscribe(
        (updatedSalle) => {
          const index = this.sallesdesport.findIndex(salle => salle.id === updatedSalle.id);
          if (index > -1) {
            this.sallesdesport[index] = updatedSalle;  // Update the salle in the list
          }
          this.editSalledesport = null;  // Reset the edit form
        },
        (error) => {
          console.error('Error saving salle edit:', error);  // Log error during save
          alert('Error saving edits. Please try again.');
        }
      );
    }
  }

  // Method to delete a sports hall - Only accessible to 'ROLE_OWNER'
  deleteSalledesport(id: number): void {
    if (this.userRole === 'ROLE_OWNER') {
      if (confirm('Are you sure you want to delete this sports hall?')) {
        this.salleService.deleteSalledesport(id).subscribe(
          () => {
            this.sallesdesport = this.sallesdesport.filter(salle => salle.id !== id);  // Remove the salle from the list
          },
          (error) => {
            console.error('Error deleting salle:', error);  // Log error during deletion
            alert('Error deleting salle. Please try again.');
          }
        );
      }
    } else {
      alert('Vous devez être un propriétaire pour supprimer une salle.');
    }
  }
}
