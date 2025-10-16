import { Component, Input, Output, EventEmitter } from '@angular/core';

interface Product {
  id: number;
  title: string;
  description?: string;
  price: number;
  whatsappLink?: string;
  phoneNumber?: string;
  mainImage: string;
  images?: { url: string }[];
  status: 'PENDING' | 'APPROVED' | 'REJECTED' | 'DEACTIVATED';
  categoryId?: number;
  viewCount?: number;
  vipPoints?: {
    points: number;
    expiresAt: string;
  };
  seller?: {
    email: string;
  };
  category?: {
    name: string;
  };
}

@Component({
  selector: 'app-product-detail-modal',
  standalone: false,
  templateUrl: './product-detail-modal.html',
  styleUrl: './product-detail-modal.css'
})
export class ProductDetailModal {
  @Input() product: Product | null = null;
  @Output() close = new EventEmitter<void>();

  onClose(): void {
    this.close.emit();
  }  
}
