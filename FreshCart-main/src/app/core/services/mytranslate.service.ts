import { isPlatformBrowser } from '@angular/common';
import { inject, Injectable, PLATFORM_ID, Renderer2, RendererFactory2 } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Injectable({
  providedIn: 'root'
})
export class MytranslateService {

  private readonly _TranslateService:TranslateService=inject(TranslateService) 
  private readonly _Renderer2:Renderer2=inject(RendererFactory2).createRenderer(null,null) 
  private readonly _platId=inject(PLATFORM_ID) 
  constructor() { 

    if (isPlatformBrowser(this._platId)) {
      

    this._TranslateService.setDefaultLang('en');
    this.setLang()
   
    }
  }
  setLang():void{
    let savedLang = localStorage.getItem('lang');
    if (savedLang) {
      this._TranslateService.use(savedLang!)
    }

    
    if (savedLang =="en") {
     
      this._Renderer2.setAttribute(document.documentElement,'dir','ltr')
      this._Renderer2.setAttribute(document.documentElement,'lang','en')
      
    } else if (savedLang == "ar"){
      console.log(savedLang, "in");
      this._Renderer2.setAttribute(document.documentElement,'dir','rtl')
      this._Renderer2.setAttribute(document.documentElement,'lang','ar')


    }

  }
  
  changeLang(lang:string):void{
    if (isPlatformBrowser(this._platId)) {
    localStorage.setItem('lang',lang);
    this.setLang()
    }
   }
}
