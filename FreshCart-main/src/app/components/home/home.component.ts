import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import { Subscription } from 'rxjs';
import { IProduct } from '../../core/interfaces/iproduct';
import { ProductsService } from './../../core/services/products.service';
import { AfterViewInit, Component, ElementRef, inject, OnDestroy, OnInit, Renderer2, ViewChild, signal, WritableSignal } from '@angular/core';
import { CategoriesService } from '../../core/services/categories.service';
import { ICategory } from '../../core/interfaces/icategory';
import { RouterLink } from '@angular/router';
import { CurrencyPipe, DatePipe, JsonPipe, LowerCasePipe, SlicePipe, TitleCasePipe, UpperCasePipe } from '@angular/common';
import { TermTextPipe } from '../../core/pipes/term-text.pipe';
import { SearchPipe } from '../../core/pipes/search.pipe';
import { FormsModule } from '@angular/forms';
import { CartService } from '../../core/services/cart.service';
import { ToastrService } from 'ngx-toastr';
import { ProductItemComponent } from '../product-item/product-item.component';
import { WishListService } from '../../core/services/wish-list.service';


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CarouselModule,RouterLink,FormsModule,
    UpperCasePipe,LowerCasePipe,TitleCasePipe,SlicePipe,CurrencyPipe, DatePipe,JsonPipe,TermTextPipe,SearchPipe,ProductItemComponent
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit  ,OnDestroy{

productsList:WritableSignal<IProduct[]>=signal<IProduct[]>([]);
categoriesList:WritableSignal<ICategory[]>=signal<ICategory[]>([]);

mainSliderList:string[] =[
  "./assets/mainSlider/1.avif",
  "./assets/mainSlider/2.avif",
  "./assets/mainSlider/3.avif",
  "./assets/mainSlider/4.gif",
  "./assets/mainSlider/5.avif",
  "./assets/mainSlider/6.avif",
  "./assets/mainSlider/7.avif",
  "./assets/mainSlider/8.avif",
  "./assets/mainSlider/9.avif",
];
getAllProductsSub!:Subscription
getAllCategoriesSub!:Subscription

prouductSearch:string = "";
wishproductsList:IProduct[] =[];



private readonly _ProductsService =  inject(ProductsService);
private readonly _CategoriesService =  inject(CategoriesService);
private readonly _WishListService: WishListService =inject(WishListService);





customOptionsCategories: OwlOptions = {
  loop: true,
  mouseDrag: true,
  touchDrag: true,
  pullDrag: true,
  dots: true,
  rtl:true,
  navSpeed: 500,
  autoplay:true,
  autoplayTimeout:3000,
  autoplayHoverPause:true,
  navText: ['Next', 'Prev'],
  responsive: {
    0: {
      items: 1
    },
    400: {
      items: 2
    },
    740: {
      items: 3
    },
    940: {
      items: 6
    }
  },
  nav: false
}

customOptionsMain: OwlOptions = {
  loop: true,
  mouseDrag: true,
  touchDrag: true,
  pullDrag: true,
  rtl:true,
  dots: false,
  navSpeed: 700,
  autoplay:true,
  autoplayTimeout:5000,
  autoplayHoverPause:true,
  navText: ['Next', 'Prev'],
  responsive: {
    0: {
      items: 1
    },
    400: {
      items: 1
    },
    740: {
      items: 1
    },
    940: {
      items: 1
    }
  },
  nav: false
}

 

  
 


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

  this.getAllCategoriesSub = this._CategoriesService.getAllCategories().subscribe({
    next:(res)=>{
      console.log(res);
    this.categoriesList.set( res.data)
    // this.spinner.hide()

      
    }
    ,
    error:(err)=>{
      console.log(err);
      
    }
  })
  this.getAllProductsSub = this._ProductsService.getAllProducts().subscribe({next:(res)=>{


    console.log(res);
    
   
    this.productsList.set( res.data)

  },
  error:(err)=>{
    console.log(err);
    
  }
})
 

 }
 
 ngOnDestroy(): void {
  
  this.getAllProductsSub?.unsubscribe();
  this.getAllCategoriesSub?.unsubscribe();
  
 }
 

 hasHeart(id:string):boolean
 {
   return this.wishproductsList.findIndex(x=>x.id == id)>=0;
 }

}
