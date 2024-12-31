import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../Services/auth.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css'],
  standalone: true,
  imports: [FormsModule, CommonModule]
})
export class AuthComponent {
  signupForm = {
    username: '',
    email: '',
    password: '',
    adresse: '',
    roles: ['USER'] // Default role is USER, can also be 'OWNER'
  };

  loginForm = {
    username: '',
    password: ''
  };

  isLoggedIn = false;
  userDetails: any = null;
  errorMessage: string | null = null;

  showRegister = true; // To toggle between Register and Login sections

  constructor(private authService: AuthService, private router: Router) {}

  // Handle User Signup
  handleSignup() {
    // Ensure that the user cannot register as an ADMIN
    if (this.signupForm.roles[0] === 'ADMIN') {
      this.errorMessage = 'You cannot register as an ADMIN!';
      return;
    }
  
    this.authService.signup(this.signupForm).subscribe({
      next: (response) => {
        alert(response.message);
        this.resetForms();
        this.router.navigate(['/login']);
      },
      error: (err: HttpErrorResponse) => {
        this.errorMessage = `Signup Failed: ${err.message}`;
      }
    });
  }
  
  // Handle User Login
  handleLogin() {
    this.authService.signin(this.loginForm).subscribe({
      next: (response) => {
        this.isLoggedIn = true;
        this.userDetails = response;
        localStorage.setItem('accessToken', response.accessToken);
        localStorage.setItem('refreshToken', response.refreshToken);
        alert('Login Successful!');
        this.router.navigate(['/']); // Redirect to home page after login
      },
      error: (err: HttpErrorResponse) => {  
        this.errorMessage = `Login Failed: ${err.message}`;
      }
    });
  }
  

  // Handle User Logout
  handleLogout() {
    const refreshToken = localStorage.getItem('refreshToken');
    if (!refreshToken) {
      alert('No refresh token found!');
      return;
    }

    this.authService.logout(refreshToken).subscribe({
      next: (response) => {
        alert(response.message);
        this.resetSession();
        this.router.navigate(['/']);
      },
      error: (err: HttpErrorResponse) => {
        this.errorMessage = `Logout Failed: ${err.message}`;
      }
    });
  }

  // Helper Methods
  resetForms() {
    this.signupForm = { username: '', email: '', password: '', adresse: '', roles: ['USER'] };
    this.loginForm = { username: '', password: '' };
    this.errorMessage = null;
  }

  resetSession() {
    this.isLoggedIn = false;
    this.userDetails = null;
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('userRole');
  }
}
