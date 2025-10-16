import { Component, OnInit, OnDestroy } from '@angular/core'; // Import OnDestroy
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { ProductService } from '../../services/product.service';
import { CategoryService } from '../../services/category.service';
import { FormsModule } from '@angular/forms';
import { ViewService } from '../../services/view.service'; // Import ViewService
import { FavoriteService } from '../../services/favorite'; // Import FavoriteService
import { Subscription } from 'rxjs'; // Import Subscription

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
  isLiked?: boolean; // Add isLiked property
}

interface Category {
  id: number;
  name: string;
}

@Component({
  selector: 'app-product-list',
  standalone: false,
  templateUrl: './product-list.html',
  styleUrl: './product-list.css',
})
export class ProductListComponent implements OnInit, OnDestroy { // Implement OnDestroy
  products: Product[] = [];
  categories: Category[] = [];
  selectedCategoryId: number | null = null;
  minPrice?: number;
  maxPrice?: number;
  sortBy?: string;
  currentPage: number = 1;
  pageSize: number = 10;
  totalProducts: number = 0;
  selectedProduct: Product | null = null; // To store the product for the modal
  private authSubscription: Subscription = new Subscription(); // For auth state subscription

  constructor(
    public authService: AuthService,
    private router: Router,
    private productService: ProductService,
    private categoryService: CategoryService,
    private viewService: ViewService, // Inject ViewService
    private favoriteService: FavoriteService // Inject FavoriteService
  ) {}

  ngOnInit(): void {
    this.loadProducts();
    this.loadCategories();

    // Subscribe to auth state changes to reload products and update UI
    this.authSubscription = this.authService.currentUser.subscribe(() => {
      this.loadProducts();
    });
  }

  ngOnDestroy(): void {
    this.authSubscription.unsubscribe(); // Unsubscribe to prevent memory leaks
  }

  loadProducts(): void {
    const params: any = {
      status: 'APPROVED',
      page: this.currentPage,
      pageSize: this.pageSize
    };
    if (this.selectedCategoryId) {
      params.categoryId = this.selectedCategoryId;
    }
    if (this.minPrice !== undefined) {
      params.minPrice = this.minPrice;
    }
    if (this.maxPrice !== undefined) {
      params.maxPrice = this.maxPrice;
    }
    if (this.sortBy) {
      params.sortBy = this.sortBy;
    }

    this.productService.getProducts(params).subscribe({
      next: (response: { products: Product[], total: number }) => {
        this.products = response.products;
        this.totalProducts = response.total; // Update totalProducts
        this.products.forEach(product => {
          this.viewService.countViewsByProduct(product.id).subscribe({
            next: (viewResponse) => {
              product.viewCount = viewResponse.count;
            },
            error: (error: any) => { // Explicitly type error
              console.error('Error counting views for product', product.id, error);
            }
          });

          // Check if the product is liked by the current user
          const currentUser = this.authService.currentUserValue;
          if (currentUser) {
            this.favoriteService.isProductFavorite(product.id, currentUser.id).subscribe({
              next: (favoriteResponse: { isFavorite: boolean }) => { // Explicitly type favoriteResponse
                product.isLiked = favoriteResponse.isFavorite;
              },
              error: (error: any) => { // Explicitly type error
                console.error('Error checking if product is favorite', product.id, error);
              }
            });
          }
        });
      },
      error: (error: any) => { // Explicitly type error
        console.error('Error loading products', error);
      }
    });
  }

  loadCategories(): void {
    this.categoryService.getCategories().subscribe({
      next: (categories) => {
        this.categories = categories;
      },
      error: (error) => {
        console.error('Error loading categories', error);
      }
    });
  }

  filterByCategory(): void {
    this.currentPage = 1; // Reset to first page on filter change
    this.loadProducts(); // Reload products with filter
  }

  onPageChange(page: number): void {
    this.currentPage = page;
    this.loadProducts();
  }

  recordView(productId: number): void {
    this.viewService.createView(productId).subscribe({
      next: (response) => {
        console.log('View recorded', response);
        // Optionally update view count in UI
        const product = this.products.find(p => p.id === productId);
        if (product && product.viewCount !== undefined) {
          product.viewCount++;
        }
      },
      error: (error) => {
        console.error('Error recording view', error);
      }
    });
  }

  logout(): void {
    this.authService.logout();
  }

  openProductDetailModal(product: Product): void {
    this.selectedProduct = product;
  }

  closeProductDetailModal(): void {
    this.selectedProduct = null;
  }

  toggleLike(product: Product): void {
    if (!this.authService.isLoggedIn()) {
      alert('Veuillez vous connecter pour ajouter des produits aux favoris.');
      this.router.navigate(['/auth/login']);
      return;
    }

    if (product.isLiked) {
      this.favoriteService.removeFavorite(product.id).subscribe({
        next: () => {
          product.isLiked = false;
          console.log('Product unliked');
        },
        error: (error: any) => { // Explicitly type error
          console.error('Error unliking product', error);
          alert('Erreur lors de la suppression du produit des favoris.');
        }
      });
    } else {
      this.favoriteService.addFavorite(product.id).subscribe({
        next: () => {
          product.isLiked = true;
          console.log('Product liked');
        },
        error: (error: any) => { // Explicitly type error
          console.error('Error liking product', error);
          alert('Erreur lors de l\'ajout du produit aux favoris.');
        }
      });
    }
  }
}
