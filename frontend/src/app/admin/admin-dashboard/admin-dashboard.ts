import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Location } from '@angular/common'; // Import Location
import { AuthService } from '../../services/auth.service'; // Import AuthService

interface Product {
  id: number;
  title: string;
  description?: string;
  price: number;
  mainImage: string;
  status: 'PENDING' | 'APPROVED' | 'REJECTED' | 'DEACTIVATED';
  createdAt: string;
  seller?: {
    email: string;
  };
}

@Component({
  selector: 'app-admin-dashboard',
  standalone: false,
  templateUrl: './admin-dashboard.html',
  styleUrl: './admin-dashboard.css'
})
export class AdminDashboardComponent implements OnInit {
  products: Product[] = [];
  totalProducts: number = 0;
  pendingProducts: number = 0;
  approvedProducts: number = 0;
  rejectedProducts: number = 0;
  errorMessage: string | null = null; // Added for displaying errors

  selectedStatus: string = 'PENDING';
  searchTerm: string = '';
  currentPage: number = 1;
  pageSize: number = 10;
  totalPages: number = 1;

  constructor(private http: HttpClient, private router: Router, private authService: AuthService, private location: Location) {} // Inject Location

  ngOnInit(): void {
    this.loadDashboardStats();
    this.loadProducts();
  }

  goBack(): void {
    this.location.back();
  }

  loadDashboardStats(): void {
    this.errorMessage = null; // Clear previous errors
    // Get all products for stats
    this.http.get<{ products: Product[], total: number }>('http://localhost:3000/api/products').subscribe({
      next: (response) => {
        const allProducts = response.products;
        this.totalProducts = response.total; // Use total from response
        this.pendingProducts = allProducts.filter(p => p.status === 'PENDING').length;
        this.approvedProducts = allProducts.filter(p => p.status === 'APPROVED').length;
        this.rejectedProducts = allProducts.filter(p => p.status === 'REJECTED').length;
      },
      error: (error) => {
        console.error('Error loading dashboard stats:', error);
        this.errorMessage = 'Erreur lors du chargement des statistiques du tableau de bord.';
      }
    });
  }

  loadProducts(): void {
    this.errorMessage = null; // Clear previous errors
    const params: any = {
      page: this.currentPage,
      pageSize: this.pageSize
    };

    if (this.selectedStatus) {
      params.status = this.selectedStatus;
    }

    if (this.searchTerm) {
      params.search = this.searchTerm;
    }

    this.http.get<{ products: Product[], total: number }>('http://localhost:3000/api/products', { params }).subscribe({
      next: (response) => {
        this.products = response.products;
        this.totalProducts = response.total;
        this.totalPages = Math.ceil(this.totalProducts / this.pageSize);
      },
      error: (error) => {
        console.error('Error loading products:', error);
        this.errorMessage = 'Erreur lors du chargement des produits.';
      }
    });
  }

  filterProducts(): void {
    this.currentPage = 1;
    this.loadProducts();
  }

  changePage(page: number): void {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
      this.loadProducts();
    }
  }

  updateProductStatus(productId: number, status: string): void {
    this.http.put(`http://localhost:3000/api/products/${productId}/status`, { status }, { headers: this.authService.getAuthHeaders() }).subscribe({
      next: (response) => {
        console.log('Product status updated:', response);
        this.loadProducts();
        this.loadDashboardStats();
      },
      error: (error) => {
        console.error('Error updating product status:', error);
        this.errorMessage = 'Erreur lors de la mise à jour du statut du produit.';
      }
    });
  }

  viewProductDetails(product: Product): void {
    // Navigate to product detail page or open modal
    // For now, just log the product
    console.log('View product details:', product);
  }

  deleteProduct(productId: number): void {
    if (confirm('Êtes-vous sûr de vouloir supprimer ce produit ?')) {
      this.http.delete(`http://localhost:3000/api/products/${productId}`, { headers: this.authService.getAuthHeaders() }).subscribe({
        next: () => {
          alert('Produit supprimé avec succès !');
          this.loadProducts();
          this.loadDashboardStats();
        },
        error: (error) => {
          console.error('Error deleting product:', error);
          this.errorMessage = 'Erreur lors de la suppression du produit.';
        }
      });
    }
  }
}
