import { CurrencyPipe } from '@angular/common';
import { ICart } from '../../core/interfaces/icart';
import { CartService } from './../../core/services/cart.service';
import { Component, inject, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CurrencyPipe,RouterLink],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss'
})
export class CartComponent  implements OnInit{


  private _CartService:CartService =inject(CartService);
  
  
  cartDetails:ICart = {} as ICart;
  isCount: boolean=true;
  
  
  
  ngOnInit(): void {
  
    this._CartService.getCartProducts().subscribe({
      next:(res:any)=>{
        console.log(res.data);
        this.cartDetails  = res.data;
        
      },
      error:(err)=>{
        console.log(err);
        
      }
    })
    
    
  }
  
  removeItem(id:string) {
    this._CartService.deleteSpecificCartItem(id).subscribe({
      next:(res)=>{
        console.log(res);
        this.cartDetails  = res.data;
        this._CartService.cartCount.set(res.numOfCartItems);

        
      },
      error:(err)=>{
        console.log(err);
        
      }
    })
  }


  updateCount(id: string,count: number) {
    this.isCount=false;


    this._CartService.updateCartProductQuantity(id,count).subscribe({
      next:(res)=>{
        console.log(res);
        this.cartDetails  = res.data;
        
        this.isCount=true;
        
      },
      error:(err)=>{
        console.log(err);
        this.isCount=true;

        
      }
    })

    }
  
    openAlart(){
      Swal.fire({
        title: 'Are You Sure!',
        text: 'Do you want to continue',
        icon: 'warning',
        confirmButtonText: 'Delete',
        confirmButtonColor:'red'
      }).then((res)=>{
        if (res.isConfirmed) {
          this.clearItems();
        }
      });
      
    }
    clearItems() {
      this._CartService.clearCart().subscribe({
        next:(res)=>{
          console.log(res);
          if(res.message=='success'){
            this.cartDetails ={} as ICart
            this._CartService.cartCount.set(0);

          }
        },
        error:(err)=>{
          console.log(err);
          
        }
      })
      }


  
  
}
