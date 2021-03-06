import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EcommerceRoutingModule } from './ecommerce-routing.module';
import { ProductsComponent } from './products/products.component';
import { ProductsDetailsComponent } from './products-details/products-details.component';
import { AddNewProductsComponent } from './add-new-products/add-new-products.component';
import { OrdersComponent } from './orders/orders.component';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [
    ProductsComponent,
    ProductsDetailsComponent,
    AddNewProductsComponent,
    OrdersComponent
  ],
  imports: [
    CommonModule,
    EcommerceRoutingModule,
    SharedModule
  ]
})
export class EcommerceModule { }
