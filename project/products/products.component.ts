import { Component, OnInit } from '@angular/core';
import { AddProductService } from '../services/addproduct.service';
import { Product } from '../models/product.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
products:Product[];
  constructor(private addProductService:AddProductService,
               private router:Router) { }

  ngOnInit(): void {
    this.addProductService.getProductList().subscribe((data)=>{
      console.log(data);

      this.products=data;
    })
  }
  remove(id:number){
//     console.log(id);
//     if(confirm("Are you sure to remove employee")){
// this.addProductService.removePro(id).subscribe((data)=>{
//   console.log(data);

//   this.ngOnInit();
    this.router.navigate(['remove',id]);
  }
onEdit(products:Product){
console.log("here="+products.id);

this.router.navigate(['add',products.id]);
}
}
