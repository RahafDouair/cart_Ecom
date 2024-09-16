import { Component, inject, OnInit } from '@angular/core';
import { IProduct } from '../../core/interfaces/iproduct';
import { WishListService } from '../../core/services/wish-list.service';
import { CurrencyPipe } from '@angular/common';
import { ToastrService } from 'ngx-toastr';
import { CartService } from '../../core/services/cart.service';

@Component({
  selector: 'app-wish-list',
  standalone: true,
  imports: [CurrencyPipe],
  templateUrl: './wish-list.component.html',
  styleUrl: './wish-list.component.scss'
})
export class WishListComponent implements OnInit {
  wishproductsList:IProduct[] =[];

  private readonly _WishListService: WishListService =inject(WishListService);
  private readonly toastr: ToastrService =inject(ToastrService);
  private readonly _CartService =  inject(CartService);


  ngOnInit(): void {
      
  this._WishListService.getWish().subscribe({
    next:(res)=>{
       console.log(res.data);
       this.wishproductsList=res.data;
    
       
    },
    error:(err)=>{
      console.log(err);
      
    }
  })

  }

  removeItem(id:string) {
    this._WishListService.removeFormWish(id).subscribe({next:(res)=>{
      this.toastr.success(res.message,"Fresh Cart")
      console.log(res);
        this._WishListService.getWish().subscribe({
        next:(res)=>{
           console.log(res.data);
           this.wishproductsList=res.data;
        
           
        },
        error:(err)=>{
          console.log(err);
          
        }
      })

    }})
  }


  addToCart(id:string){
    console.log("hi inside");
   this._CartService.addProductToCart(id).subscribe({
    next:(res)=>{
      this.toastr.success(res.message,'Fresh Cart')
      console.log(res);
      this._CartService.cartCount.set(res.numOfCartItems);
      
    },
    error:(error)=>{
      console.log(error);
      
    }
   })
   }

}
