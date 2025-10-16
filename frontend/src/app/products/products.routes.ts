import { Routes } from '@angular/router';

import { ProductListComponent } from './product-list/product-list'; // Import ProductListComponent

import { SellerProductFormComponent } from './seller-product-form/seller-product-form'; // Import SellerProductFormComponent
import { BuyVipPointsComponent } from './buy-vip-points/buy-vip-points'; // Import BuyVipPointsComponent

export const PRODUCTS_ROUTES: Routes = [
  { path: '', component: ProductListComponent }, // Default route for products
  { path: 'new', component: SellerProductFormComponent }, // Route for creating a new product
  { path: 'buy-vip-points', component: BuyVipPointsComponent }, // Route for buying VIP points
];
