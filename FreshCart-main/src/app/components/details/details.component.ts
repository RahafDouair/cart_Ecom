import { ToastrService } from 'ngx-toastr';
import { Component, CUSTOM_ELEMENTS_SCHEMA, inject, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductsService } from '../../core/services/products.service';
import { IProduct } from '../../core/interfaces/iproduct';
import Swiper from 'swiper';
import { CartService } from '../../core/services/cart.service';

@Component({
  selector: 'app-details',
  standalone: true,
  imports: [],
  schemas:[CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './details.component.html',
  styleUrl: './details.component.scss'
})
export class DetailsComponent implements OnInit {

  
  private readonly _ActivatedRoute= inject(ActivatedRoute)
  readonly _ProductsServicec= inject(ProductsService)
  readonly _CartService= inject(CartService)
  private readonly toastr: ToastrService =inject(ToastrService);

  detailsProduct!:IProduct;

  @ViewChild('slider') silder!:Swiper

  ngOnInit(): void {
    

    console.log("detailsProduct",this.detailsProduct);
    
   this._ActivatedRoute.data.subscribe({
    next:(res:any)=>{
      console.log(res.myRes.data);
      this.detailsProduct=res.myRes.data;
      
    }
    ,
    error:(err)=>{
      console.log(err);
      
    }
   })
  }
  getSliderDir() {

    // console.log("getSliderDir" ,document.body.clientWidth);
    // if (this.silder) {
    //   this.silder?.slideNext();
    // }

    return document.body.clientWidth>=622?'vertical':'horizontal';
    }


    addToCart(id:string){
      console.log("hi inside");
     this._CartService.addProductToCart(id).subscribe({
      next:(res)=>{
        this.toastr.success(res.message,'Fresh Cart')
        console.log(res);
        console.log(res.numOfCartItems);
        this._CartService.cartCount.set(res.numOfCartItems);
        
      },
      error:(error)=>{
        console.log(error);
      }

     })
     }
   
  
}
