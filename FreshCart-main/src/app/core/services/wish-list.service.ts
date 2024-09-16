import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';
import { Observable } from 'rxjs';
import { IProduct } from '../interfaces/iproduct';

@Injectable({
  providedIn: 'root'
})
export class WishListService {


  constructor(private readonly _HttpClient:HttpClient) {

   }

  addToWish(id:string):Observable<any>{

    return this._HttpClient.post(`${environment.baseUrl}/api/v1/wishlist`,{
      "productId": id
    })
    }



removeFormWish(id:string):Observable<any>{

  return this._HttpClient.delete(`${environment.baseUrl}/api/v1/wishlist/${id}`)
  }

getWish():Observable<any>{

  return this._HttpClient.get(`${environment.baseUrl}/api/v1/wishlist`)
  }




}





