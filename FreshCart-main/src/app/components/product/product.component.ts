import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { IProduct } from '../../core/interfaces/iproduct';
import { ProductsService } from '../../core/services/products.service';
import { ProductItemComponent } from '../product-item/product-item.component';
import { SearchPipe } from '../../core/pipes/search.pipe';
import { WishListService } from '../../core/services/wish-list.service';

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [SearchPipe,ProductItemComponent],
  templateUrl: './product.component.html',
  styleUrl: './product.component.scss'
})
export class ProductComponent implements OnInit ,OnDestroy{
  productsList:IProduct[] =[];
  wishproductsList:IProduct[] =[];
  prouductSearch:string = "";
  getAllProductsSub!:Subscription

  private readonly _ProductsService =  inject(ProductsService);
  private readonly _WishListService: WishListService =inject(WishListService);

  
  
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

    this.getAllProductsSub = this._ProductsService.getAllProducts().subscribe({next:(res)=>{


      console.log(res);
      
     
      this.productsList =res.data;
  
    },
    error:(err)=>{
      console.log(err);
      
    }
  })
  }


  ngOnDestroy(): void {
  
    this.getAllProductsSub?.unsubscribe();
    
   }

   hasHeart(id:string):boolean
   {
     return this.wishproductsList.findIndex(x=>x.id == id)>=0;
   }
   
  
}
