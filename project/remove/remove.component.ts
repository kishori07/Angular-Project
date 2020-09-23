import { Component, OnInit, ViewChild } from '@angular/core';
import { AddProductService } from '../services/addproduct.service';
import { ActivatedRoute, Router } from '@angular/router';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-remove',
  templateUrl: './remove.component.html',
  styleUrls: ['./remove.component.css']
})
export class RemoveComponent implements OnInit {
@ViewChild("empForm",{static:true}) empForm:NgForm

  constructor(private addProduct:AddProductService,
              private activatedRoute:ActivatedRoute,
              private router:Router) { 
                activatedRoute.params.subscribe((params)=>{
                  const id=params.id;

                  if(id){
                    console.log("RemoveId="+id)
                    addProduct.getProductById(id).subscribe((data)=>{
                      if(data){
                        this.empForm.setValue(data);
                      }
                    })
                  }
                })
              }

  ngOnInit(): void {
  }
confirm(){
  const remove=this.empForm.value;
  this.addProduct.removePro(remove.id).subscribe(data=>{
    console.log(data);
  
    this.router.navigateByUrl("/productList");
}
  )};

cancel(){
  this.router.navigateByUrl("/productList");
}
}