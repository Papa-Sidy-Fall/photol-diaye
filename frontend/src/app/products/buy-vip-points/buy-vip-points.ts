import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../../services/auth.service'; // Import AuthService

@Component({
  selector: 'app-buy-vip-points',
  standalone: false,
  templateUrl: './buy-vip-points.html',
  styleUrl: './buy-vip-points.css'
})
export class BuyVipPointsComponent implements OnInit {
  vipPointsForm: FormGroup;
  currentUserId: number | null = null;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private http: HttpClient,
    private authService: AuthService // Inject AuthService
  ) {
    this.vipPointsForm = this.fb.group({
      productId: ['', []],
      points: ['', []],
      expiresAt: ['', []],
    });
  }

  ngOnInit(): void {
    this.authService.currentUser.subscribe(user => {
      if (user) {
        this.currentUserId = user.id;
      } else {
        this.router.navigate(['/auth/login']); // Redirect if not logged in
      }
    });
  }

  onSubmit(): void {
    if (this.vipPointsForm.valid && this.currentUserId) {
      const { productId, points, expiresAt } = this.vipPointsForm.value;
      const vipPointsData = {
        userId: this.currentUserId,
        productId: Number(productId),
        points: Number(points),
        expiresAt: expiresAt,
      };

      this.http.post('http://localhost:3000/api/vip-points', vipPointsData)
        .subscribe({
          next: (response) => {
            console.log('VIP points added successfully', response);
            this.router.navigate(['/products']); // Redirect to product list
          },
          error: (error) => {
            console.error('Error adding VIP points', error);
          }
        });
    } else {
      console.log('Form is invalid or user not logged in');
    }
  }
}
