import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProductsComponent } from './project/products/products.component';
import { AddProductsComponent } from './project/add-products/add-products.component';
import { RemoveComponent } from './project/remove/remove.component';


const routes: Routes = [
  {path:"productList",component:ProductsComponent},
  {path:"add",component:AddProductsComponent},
  {path:"add/:id",component:AddProductsComponent},
  {path:"remove/:id",component:RemoveComponent},
  {path:"", redirectTo:"/productList" ,pathMatch:"full"}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

