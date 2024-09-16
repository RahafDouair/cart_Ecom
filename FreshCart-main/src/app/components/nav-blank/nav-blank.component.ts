import { single } from 'rxjs';
import { Component, computed, ElementRef, inject, Inject, OnInit, QueryList, Renderer2, Signal, viewChild, ViewChild, ViewChildren, viewChildren } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';
import { FlowbiteService } from '../../core/services/flowbite.service';
import {  TranslateModule, TranslatePipe, TranslateService } from '@ngx-translate/core';
import { MytranslateService } from '../../core/services/mytranslate.service';
import { CartService } from '../../core/services/cart.service';

@Component({
  selector: 'app-nav-blank',
  standalone: true,
  imports: [RouterLink,RouterLinkActive,TranslateModule],
  templateUrl: './nav-blank.component.html',
  styleUrl: './nav-blank.component.scss'
})
export class NavBlankComponent implements OnInit {

 currentLang:string=""
 
@ViewChild('navshow') navList!:ElementRef 
@ViewChild('lang') langList!:ElementRef 
 readonly _AuthService:AuthService =inject(AuthService);
 readonly _CartService:CartService =inject(CartService);
 private readonly _Renderer2:Renderer2 =inject(Renderer2);
   readonly  _TranslateService:TranslateService =inject(TranslateService);
   private readonly _MytranslateService:MytranslateService =inject(MytranslateService);
   cartItems:Signal<number>=computed(()=> this._CartService.cartCount());

  
   ngOnInit(): void {
    this._CartService.getCartProducts().subscribe({
      next:(res:any)=>{
        console.log(res);
        this._CartService.cartCount.set(res.numOfCartItems)
        
      },
      error:(err)=>{
        console.log(err);
        
      }
    })
    
    

    
   }

  show(x:number){
    let ele=null;
    if (x==1) {
    ele=  this.navList.nativeElement

    }else{
      ele=this.langList.nativeElement

    }
   
    if (ele.classList.contains('hidden')) {
      this._Renderer2.removeClass(ele,'hidden')
    }else{
      this._Renderer2.addClass(ele,'hidden')

    }
  }


  changeLang(lang:string){
    this.currentLang=lang
    this.show(0)
    
    this._MytranslateService.changeLang(lang);
   

  }

}
