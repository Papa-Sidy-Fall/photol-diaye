import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../../services/auth.service'; // Assuming AuthService path
import { CategoryService } from '../../services/category.service'; // Import CategoryService

interface Category {
  id: number;
  name: string;
}

@Component({
  selector: 'app-seller-product-form',
  standalone: false,
  templateUrl: './seller-product-form.html',
  styleUrl: './seller-product-form.css',
})
export class SellerProductFormComponent implements OnInit {
  productForm: FormGroup;
  @ViewChild('videoElement') videoElement!: ElementRef<HTMLVideoElement>;
  @ViewChild('canvasElement') canvasElement!: ElementRef<HTMLCanvasElement>;
  videoStream: MediaStream | null = null;
  capturedImages: string[] = [];
  currentSellerId: number | null = null;
  categories: Category[] = []; // To store categories from backend

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private http: HttpClient,
    private authService: AuthService, // Inject AuthService
    private categoryService: CategoryService // Inject CategoryService
  ) {
    this.productForm = this.fb.group({
      title: ['', Validators.required],
      description: [''],
      price: ['', [Validators.required, Validators.min(0)]],
      whatsappLink: [''],
      phoneNumber: [''],
      mainImage: ['', Validators.required],
      images: [[]], // Array of base64 strings
      categoryId: [null, Validators.required], // Set default to null and make it required
    });
  }

  ngOnInit(): void {
    this.authService.currentUser.subscribe(user => {
      if (user && user.id) {
        this.currentSellerId = user.id;
      } else {
        // Handle case where user is not logged in or sellerId is not available
        this.router.navigate(['/auth/login']); // Redirect to login if not authenticated
      }
    });
    this.loadCategories(); // Load categories on init
    this.startCamera();
  }

  loadCategories(): void {
    this.categoryService.getCategories().subscribe({
      next: (categories) => {
        this.categories = categories;
      },
      error: (error) => {
        console.error('Error loading categories', error);
        alert('Erreur lors du chargement des catégories.');
      }
    });
  }

  async startCamera(): Promise<void> {
    try {
      this.videoStream = await navigator.mediaDevices.getUserMedia({ video: true });
      if (this.videoElement && this.videoElement.nativeElement) {
        this.videoElement.nativeElement.srcObject = this.videoStream;
        this.videoElement.nativeElement.play();
      }
    } catch (error) {
      console.error('Error accessing camera:', error);
      alert('Impossible d\'accéder à la caméra. Veuillez autoriser l\'accès à la caméra.');
    }
  }

  stopCamera(): void {
    if (this.videoStream) {
      this.videoStream.getTracks().forEach(track => track.stop());
      this.videoStream = null;
    }
  }

  captureImage(): void {
    if (this.videoElement && this.canvasElement) {
      const video = this.videoElement.nativeElement;
      const canvas = this.canvasElement.nativeElement;
      const context = canvas.getContext('2d');

      if (context) {
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        context.drawImage(video, 0, 0, canvas.width, canvas.height);
        const imageData = canvas.toDataURL('image/png'); // Get base64 image
        this.capturedImages.push(imageData);
        this.productForm.get('images')?.setValue(this.capturedImages);
        if (this.capturedImages.length === 1) {
          this.productForm.get('mainImage')?.setValue(imageData);
        }
      }
    }
  }

  removeImage(index: number): void {
    this.capturedImages.splice(index, 1);
    this.productForm.get('images')?.setValue(this.capturedImages);
    if (this.productForm.get('mainImage')?.value === null && this.capturedImages.length > 0) {
      this.productForm.get('mainImage')?.setValue(this.capturedImages[0]);
    } else if (this.capturedImages.length === 0) {
      this.productForm.get('mainImage')?.setValue('');
    }
  }

  setMainImage(image: string): void {
    this.productForm.get('mainImage')?.setValue(image);
  }

  onSubmit(): void {
    if (this.productForm.valid && this.currentSellerId !== null) {
      const { images, ...rest } = this.productForm.value;
      const productData = {
        ...rest,
        images: images, // images are already base64 strings
        sellerId: this.currentSellerId,
        price: Number(rest.price),
        categoryId: rest.categoryId ? Number(rest.categoryId) : undefined,
      };

      this.http.post('http://localhost:3000/api/products', productData, { headers: this.authService.getAuthHeaders() })
        .subscribe({
          next: (response) => {
            console.log('Product created successfully', response);
            alert('Produit créé avec succès ! Il est maintenant en attente de validation par l\'administrateur.');
            this.stopCamera();
            this.router.navigate(['/products']);
          },
          error: (error) => {
            console.error('Error creating product', error);
            alert('Erreur lors de la création du produit. Veuillez vous assurer que vous êtes connecté en tant que vendeur.');
          }
        });
    } else {
      console.log('Form is invalid or seller ID is missing');
      alert('Veuillez remplir tous les champs requis et vous assurer que vous êtes connecté en tant que vendeur.');
      this.productForm.markAllAsTouched();
    }
  }

  ngOnDestroy(): void {
    this.stopCamera();
  }
}
