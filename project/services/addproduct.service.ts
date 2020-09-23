import{Injectable} from '@angular/core'
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {Product} from '../models/product.model';
@Injectable({
    providedIn:'root',
})
export class AddProductService {
    constructor(private httpClient:HttpClient ) {}

    private prodUrl="http://localhost:3000/productList/";

    getProductList():Observable<Product[]>{
        return this.httpClient.get<Product[]>(this.prodUrl);
    }
    getProductById(id:number):Observable<Product[]>{
        console.log("serviceid="+id);
        const url= this.prodUrl+id;
return this.httpClient.get<Product[]>(url);
    }

    removePro(id:number):Observable<{status:string,message:string}>{
        const url=this.prodUrl+id;
        console.log(url);
        return this.httpClient.delete<{status:string,message:string}>(url);
         }

addProduct(product:Product):Observable<{status:string,message:string}>{
    
return this.httpClient.post<{status:string,message:string}>(this.prodUrl,product);
}
updateProduct(product:Product){
const url=this.prodUrl+product.id;
console.log("helloService");
    return this.httpClient.put<{status:string,message:string}>(url,product);
}
}