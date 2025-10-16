import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router'; // Import RouterModule
import { ReactiveFormsModule, FormsModule } from '@angular/forms'; // Import ReactiveFormsModule and FormsModule
import { PRODUCTS_ROUTES } from './products.routes'; // Import PRODUCTS_ROUTES

import { ProductListComponent } from './product-list/product-list'; // Import ProductListComponent
import { SellerProductFormComponent } from './seller-product-form/seller-product-form'; // Import SellerProductFormComponent
import { BuyVipPointsComponent } from './buy-vip-points/buy-vip-points';
import { ProductDetailModal } from './product-detail-modal/product-detail-modal'; // Import BuyVipPointsComponent

@NgModule({
  declarations: [ProductListComponent, SellerProductFormComponent, BuyVipPointsComponent, ProductDetailModal], // Declare components
  imports: [
    CommonModule,
    ReactiveFormsModule, // Add ReactiveFormsModule
    FormsModule, // Add FormsModule
    RouterModule.forChild(PRODUCTS_ROUTES) // Configure child routes
  ],
})
export class ProductsModule { }
