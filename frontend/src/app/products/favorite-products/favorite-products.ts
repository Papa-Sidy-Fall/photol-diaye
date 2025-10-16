import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { FavoriteService } from '../../services/favorite';
import { Router } from '@angular/router';
import { Location } from '@angular/common'; // Import Location

interface Product {
  id: number;
  title: string;
  description?: string;
  price: number;
  whatsappLink?: string;
  phoneNumber?: string;
  mainImage: string;
  status: 'PENDING' | 'APPROVED' | 'REJECTED' | 'DEACTIVATED';
  categoryId?: number;
  viewCount?: number;
  vipPoints?: {
    points: number;
    expiresAt: string;
  };
  isLiked?: boolean;
}

@Component({
  selector: 'app-favorite-products',
  standalone: false,
  templateUrl: './favorite-products.html',
  styleUrl: './favorite-products.css'
})
export class FavoriteProductsComponent implements OnInit {
  favoriteProducts: Product[] = [];
  selectedProduct: Product | null = null; // For product detail modal

  constructor(
    private authService: AuthService,
    private favoriteService: FavoriteService,
    private router: Router,
    private location: Location // Inject Location
  ) {}

  ngOnInit(): void {
    this.loadFavoriteProducts();
  }

  goBack(): void {
    this.location.back();
  }

  loadFavoriteProducts(): void {
    const currentUser = this.authService.currentUserValue;
    if (currentUser) {
      this.favoriteService.getFavoritesByUserId(currentUser.id).subscribe({
        next: (favorites: any[]) => {
          this.favoriteProducts = favorites.map(fav => ({ ...fav.product, isLiked: true }));
        },
        error: (error: any) => {
          console.error('Error loading favorite products:', error);
          alert('Erreur lors du chargement des produits favoris.');
        }
      });
    } else {
      this.router.navigate(['/auth/login']);
    }
  }

  removeFavorite(productId: number): void {
    const currentUser = this.authService.currentUserValue;
    if (!currentUser) {
      alert('Veuillez vous connecter pour supprimer des produits des favoris.');
      this.router.navigate(['/auth/login']);
      return;
    }

    if (confirm('Êtes-vous sûr de vouloir supprimer ce produit de vos favoris ?')) {
      this.favoriteService.removeFavorite(productId).subscribe({
        next: () => {
          alert('Produit supprimé des favoris !');
          this.loadFavoriteProducts(); // Reload favorites
        },
        error: (error: any) => {
          console.error('Error removing favorite:', error);
          alert('Erreur lors de la suppression du produit des favoris.');
        }
      });
    }
  }

  openProductDetailModal(product: Product): void {
    this.selectedProduct = product;
  }

  closeProductDetailModal(): void {
    this.selectedProduct = null;
  }
}
