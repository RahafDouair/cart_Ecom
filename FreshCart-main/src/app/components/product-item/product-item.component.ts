import { Component, inject, Input, input, InputSignal, OnInit, Renderer2 } from '@angular/core';
import { WishListService } from '../../core/services/wish-list.service';
import { IProduct } from '../../core/interfaces/iproduct';
import { ToastrService } from 'ngx-toastr';
import { RouterLink } from '@angular/router';
import { ProductsService } from '../../core/services/products.service';
import { TermTextPipe } from '../../core/pipes/term-text.pipe';
import { CurrencyPipe } from '@angular/common';
import { CartService } from '../../core/services/cart.service';

@Component({
  selector: 'app-product-item',
  standalone: true,
  imports: [RouterLink,TermTextPipe,CurrencyPipe],
  templateUrl: './product-item.component.html',
  styleUrl: './product-item.component.scss'
})
export class ProductItemComponent {
  private readonly _Renderer2: Renderer2 =inject(Renderer2);
  private readonly _WishListService: WishListService =inject(WishListService);
  private readonly toastr: ToastrService =inject(ToastrService);
   readonly _ProductsService =  inject(ProductsService);
   private readonly _CartService =  inject(CartService);



   product:InputSignal<IProduct>=input.required<IProduct>();
  @Input() isChecked!:boolean;

 
  checkHeart(e:any,id:string){
    console.log("ssssss",this.isChecked);
    
 
    if (this.isChecked===false) {
      this._Renderer2.addClass(e.target,'fa-solid')
      this._Renderer2.removeClass(e.target,'fa-regular')
      this._WishListService.addToWish(id).subscribe({next:(res)=>{
        this.toastr.success(res.message,"Fresh Cart")
        this.isChecked=true
      }})
      
      this._Renderer2.addClass(e.target,'animate-ping');
      setTimeout(() => {
        this._Renderer2.removeClass(e.target,'animate-ping');
  
      }, 1000);
  
    }else{
      this._Renderer2.removeClass(e.target,'fa-solid')
      this._Renderer2.addClass(e.target,'fa-regular')
      this._WishListService.removeFormWish(id).subscribe({next:(res)=>{
        this.toastr.success(res.message,"Fresh Cart")
        this.isChecked=false;

      }})
      
    }
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
