import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http'; // Import HttpClient
import { AuthService } from '../../services/auth.service'; // Import AuthService

@Component({
  selector: 'app-login',
  standalone: false,
  templateUrl: './login.html',
  styleUrl: './login.css', // Added comma
})
export class LoginComponent {
  loginForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private http: HttpClient, // Inject HttpClient
    private authService: AuthService // Inject AuthService
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    });
  }

  get email() { return this.loginForm.get('email'); }
  get password() { return this.loginForm.get('password'); }

  errorMessage: string | null = null;

  onSubmit(): void {
    this.errorMessage = null; // Clear previous errors
    if (this.loginForm.valid) {
      const { email, password } = this.loginForm.value;
      this.http.post('http://localhost:3000/api/auth/login', { email, password })
        .subscribe({
          next: (response: any) => {
            console.log('Login successful', response);
            this.authService.login(response.token, response.user); // Use AuthService to set token and user
            this.router.navigate(['/']);
          },
          error: (error: any) => {
            console.error('Login failed', error);
            this.errorMessage = error.error?.message || 'Login failed. Please try again.';
          }
        });
    } else {
      this.errorMessage = 'Please fill in all required fields correctly.';
      console.log('Form is invalid');
    }
  }
}
