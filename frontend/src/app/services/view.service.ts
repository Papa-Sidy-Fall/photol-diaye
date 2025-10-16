import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

interface View {
  id: number;
  productId: number;
  createdAt: Date;
}

interface ViewCountResponse {
  productId: number;
  count: number;
}

@Injectable({
  providedIn: 'root'
})
export class ViewService {
  private apiUrl = 'http://localhost:3000/api/views';

  constructor(private http: HttpClient) { }

  createView(productId: number): Observable<View> {
    return this.http.post<View>(this.apiUrl, { productId });
  }

  countViewsByProduct(productId: number): Observable<ViewCountResponse> {
    return this.http.get<ViewCountResponse>(`${this.apiUrl}/${productId}/count`);
  }
}
