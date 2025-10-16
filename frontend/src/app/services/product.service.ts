import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

interface Product {
  id: number;
  title: string;
  description?: string;
  price: number;
  whatsappLink?: string;
  phoneNumber?: string;
  mainImage: string;
  images: string[];
  status: 'PENDING' | 'APPROVED' | 'REJECTED' | 'DEACTIVATED';
  sellerId: number;
  categoryId?: number;
  createdAt: Date;
  updatedAt: Date;
}

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private apiUrl = 'http://localhost:3000/api/products';

  constructor(private http: HttpClient) { }

  getProducts(params?: any): Observable<{ products: Product[], total: number }> {
    return this.http.get<{ products: Product[], total: number }>(this.apiUrl, { params });
  }

  getProductById(id: number): Observable<Product> {
    return this.http.get<Product>(`${this.apiUrl}/${id}`);
  }

  createProduct(product: any): Observable<Product> {
    return this.http.post<Product>(this.apiUrl, product);
  }

  updateProductStatus(id: number, status: 'PENDING' | 'APPROVED' | 'REJECTED' | 'DEACTIVATED'): Observable<Product> {
    return this.http.put<Product>(`${this.apiUrl}/${id}/status`, { status });
  }

  deleteProduct(id: number): Observable<Product> {
    return this.http.delete<Product>(`${this.apiUrl}/${id}`);
  }
}
