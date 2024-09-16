import { isPlatformBrowser, isPlatformServer } from '@angular/common';
import { afterNextRender, afterRender, inject, PLATFORM_ID } from '@angular/core';
import { CanActivateFn } from '@angular/router';



export const authGuard: CanActivateFn = (route, state) => {
 const _PLATFORM_ID= inject(PLATFORM_ID);
//  isPlatformBrowser(_PLATFORM_ID)
//  isPlatformServer(_PLATFORM_ID)

afterNextRender(()=>{
  console.log("hi");
  
})
afterRender(()=>{
  console.log("hi");

})

 if (isPlatformBrowser(_PLATFORM_ID)) {
          if (localStorage.getItem('userToken')) {
            return true;
          }else{
            return false;
          }
 }else{
           return false;
 }

};
