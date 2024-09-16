import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  private _HttpClient=inject(HttpClient)

  getAllProducts():Observable<any>{
    return this._HttpClient.get(`${environment.baseUrl}/api/v1/products`)
  }
  getSpecificProduct(id:string):Observable<any>{
    return this._HttpClient.get(`${environment.baseUrl}/api/v1/products/${id}`)
  }

  getStarFration(num:number):string{
    let x= (num - Math.floor(num))*100;
    return `  background-image: linear-gradient(to right, rgb(255, 191, 0) 0%,rgb(255, 191, 0) ${x}%, rgba(0, 0, 10,0.5 ) ${x}%);
  `
  }
  
}
