import { Component, ElementRef, inject, Renderer2, ViewChild } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';
import { FlowbiteService } from '../../core/services/flowbite.service';

@Component({
  selector: 'app-nav-auth',
  standalone: true,
  imports: [RouterLink,RouterLinkActive],
  templateUrl: './nav-auth.component.html',
  styleUrl: './nav-auth.component.scss'
})
export class NavAuthComponent {


  private readonly _Renderer2:Renderer2 =inject(Renderer2);


  @ViewChild('navshow') navList!:ElementRef 

  show(x:number){
    let ele=  this.navList.nativeElement

   
   
    if (ele.classList.contains('hidden')) {
      this._Renderer2.removeClass(ele,'hidden')
    }else{
      this._Renderer2.addClass(ele,'hidden')

    }
  }



}
