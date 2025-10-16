import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service'; // Assuming AuthService path

@Injectable({
  providedIn: 'root'
})
export class FavoriteService { // Renamed to FavoriteService
  private apiUrl = 'http://localhost:3000/api/favorites';

  constructor(private http: HttpClient, private authService: AuthService) { }

  addFavorite(productId: number): Observable<any> {
    const userId = this.authService.currentUserValue?.id;
    if (!userId) {
      throw new Error('User not logged in');
    }
    return this.http.post(this.apiUrl, { productId, userId }, { headers: this.authService.getAuthHeaders() });
  }

  removeFavorite(productId: number): Observable<any> {
    const userId = this.authService.currentUserValue?.id;
    if (!userId) {
      throw new Error('User not logged in');
    }
    return this.http.delete(`${this.apiUrl}/${productId}`, { headers: this.authService.getAuthHeaders() });
  }

  isProductFavorite(productId: number, userId: number): Observable<{ isFavorite: boolean }> {
    return this.http.get<{ isFavorite: boolean }>(`${this.apiUrl}/${productId}/${userId}`, { headers: this.authService.getAuthHeaders() });
  }

  getFavoritesByUserId(userId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/${userId}`, { headers: this.authService.getAuthHeaders() });
  }
}
