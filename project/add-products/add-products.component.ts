import { Component, OnInit, ViewChild } from '@angular/core';

import { AddProductService } from '../services/addproduct.service';
import { Router, ActivatedRoute } from '@angular/router';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-add-products',
  templateUrl: './add-products.component.html',
  styleUrls: ['./add-products.component.css']
})
export class AddProductsComponent implements OnInit {
@ViewChild("empForm",{static:true}) empForm:NgForm
message=undefined;
status=undefined;
editMode=false;
  constructor(private addProductService:AddProductService,
              private router:Router,
              private activatedRoute:ActivatedRoute) { 
                activatedRoute.params.subscribe((params)=>{
                  const id=params.id;
                  console.log("dataid="+id);
                  if(id){
                    addProductService.getProductById(id).subscribe(data=>{
                      console.log("add="+data);
                      if(data){
                        this.empForm.setValue(data);
                        this.editMode=true;
                      }
                    })
                  }
                })
              }

  ngOnInit(): void {
  }

  onSubmit(){
    const prod=this.empForm.value;
    console.log(prod);
    if(this.editMode){
      this.addProductService.updateProduct(prod).subscribe(data=>{
        console.log(data);
        this.status=data.status;
        this.message=data.message;
      });
    }else{
    this.addProductService.addProduct(prod).subscribe(data=>{
      this.status=data.status;
      this.message=data.message;
    if(this.status == 'Success'){
      this.empForm.reset();
    }
    }
    );
    
    }
      }
      onCancel(){
        this.router.navigateByUrl("/productList");
      }
}
