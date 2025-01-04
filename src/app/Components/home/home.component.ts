import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../Services/auth.service';  // Import AuthService for authentication
import { CommonModule } from '@angular/common';  // Import CommonModule for *ngIf directive

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  constructor(private router: Router,private authService: AuthService) {}
  isLoggedIn: boolean = false;  // Default assumption: user is not logged in
  userRoles: string[] = [];  // To store the user's roles (Admin, Owner, User)
  
  // Method to redirect to the salle de sport page
  goToSalleDeSport() {
    this.router.navigate(['/salledesport']);  // Redirect to the /salledesport page
  }
  handleLogout() {
    const refreshToken = localStorage.getItem('refreshToken');
    if (!refreshToken) {
      alert('No refresh token found!');
      return;
    }

    this.authService.logout(refreshToken).subscribe({
      next: (response) => {
        alert(response.message);  // Display a success message after logout
        this.resetSession();
        this.router.navigate(['/']);  // Navigate to the home page after logout
      },
      error: (err) => {
        console.error('Logout Failed:', err);
        alert(`Logout Failed: ${err.message}`);
      }
    });
  }
  resetSession() {
    this.isLoggedIn = false;
    this.userRoles = [];
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('roles');
  }

  // Method to check the login status and roles of the user
  checkLoginStatus() {
    const accessToken = localStorage.getItem('accessToken');
    const roles = localStorage.getItem('roles');
    this.isLoggedIn = !!accessToken;  // If accessToken exists, the user is logged in

    // Parse the roles stored in localStorage (assuming it's a comma-separated string)
    if (roles) {
      this.userRoles = roles.split(',');
    }
  }

}

