import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

// Define Role enum directly in frontend for now
enum Role {
  CLIENT = 'CLIENT',
  SELLER = 'SELLER',
  ADMIN = 'ADMIN',
}

@Component({
  selector: 'app-register',
  standalone: false,
  templateUrl: './register.html',
  styleUrl: './register.css', // Added comma
})
export class RegisterComponent {
  registerForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private http: HttpClient // Inject HttpClient
  ) {
    this.registerForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      role: ['CLIENT', [Validators.required]]
    });
  }

  get email() { return this.registerForm.get('email'); }
  get password() { return this.registerForm.get('password'); }
  get role() { return this.registerForm.get('role'); }

  errorMessage: string | null = null;

  onSubmit(): void {
    this.errorMessage = null; // Clear previous errors
    if (this.registerForm.valid) {
      const { email, password, role } = this.registerForm.value;
      const userRole: Role = role as Role;
      this.http.post('http://localhost:3000/api/auth/register', { email, password, role: userRole })
        .subscribe({
          next: (response: any) => {
            console.log('Registration successful', response);
            localStorage.setItem('token', response.token);
            localStorage.setItem('user', JSON.stringify(response.user));
            this.router.navigate(['/']);
          },
          error: (error: any) => {
            console.error('Registration failed', error);
            this.errorMessage = error.error?.message || 'Registration failed. Please try again.';
          }
        });
    } else {
      this.errorMessage = 'Please fill in all required fields correctly.';
      console.log('Form is invalid');
    }
  }
}
