import { HttpClient } from '@angular/common/http';
import { Injectable, signal, WritableSignal } from '@angular/core';
import { environment } from '../environments/environment';
import { BehaviorSubject, Observable, single } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  cartCount:WritableSignal<number> = signal(0);

  constructor(private readonly _HttpClient:HttpClient , private readonly _AuthService:AuthService) { }

  addProductToCart(id:string):Observable<any>{
    return this._HttpClient.post(`${environment.baseUrl}/api/v1/cart`,
      {
        "productId": id
    },

    )
  }

  getCartProducts():Observable<any>{
    return this._HttpClient.get(`${environment.baseUrl}/api/v1/cart`,
      
    
    )
  }
  deleteSpecificCartItem(id:string):Observable<any>{
    return this._HttpClient.delete(`${environment.baseUrl}/api/v1/cart/${id}`,
    
    
    )
  }
  updateCartProductQuantity(id:string,count:number):Observable<any>{
    return this._HttpClient.put(`${environment.baseUrl}/api/v1/cart/${id}`,{
      "count": count
  },
    
    
    )
  }

  clearCart():Observable<any>{
    return this._HttpClient.delete(`${environment.baseUrl}/api/v1/cart`,
    
    )
  }

  

  
}
