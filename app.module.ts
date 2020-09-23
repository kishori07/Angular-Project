import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {HttpClientModule,} from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ProductsComponent } from './project/products/products.component';
import { AddProductsComponent } from './project/add-products/add-products.component';
import {AddProductService} from './project/services/addproduct.service';
import  {FormsModule} from '@angular/forms';
import { RemoveComponent } from './project/remove/remove.component'
@NgModule({
  declarations: [
    AppComponent,
    ProductsComponent,
    AddProductsComponent,
    RemoveComponent,
  
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
  ],
  providers: [AddProductService],
  bootstrap: [AppComponent]
})
export class AppModule { }
