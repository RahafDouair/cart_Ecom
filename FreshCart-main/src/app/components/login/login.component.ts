import { Component, inject, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators, AbstractControl, FormControlName, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../../core/services/auth.service';
import { NgClass } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { log } from 'console';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule,NgClass,RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnDestroy {

  loginForm:FormGroup =new FormGroup({
    email:new FormControl(null,[Validators.email,Validators.required]),
    password:new FormControl(null,[Validators.required,Validators.pattern(/^\w{6,}$/)]),
  })

   private _AuthService =inject(AuthService);
   errorMeg:string="";
   isLoading:boolean=false;

   private _Router =inject(Router);
   
   isSuccess:boolean=false;

   signInSub!:Subscription;

  loginSubmit(){
   
   
    this.loginForm.markAllAsTouched()

   if (this.loginForm.valid) {
    this.isLoading=true;

    this.signInSub =this._AuthService.signIn(this.loginForm.value).
  subscribe( {next:(data)=>{
  console.log(data)
  this.isLoading =false;
  if (data.message=='success') {
    localStorage.setItem('userToken',data.token)
    this._AuthService.saveUserData();
    

    this.isSuccess=true;
    setTimeout(()=>{
      this.isSuccess=false;
      this._Router.navigate(["/home"]) 
  },2000);
  }
  },
  error:(err)=>{
    console.log(err.error.message);
    this.errorMeg=err.error.message;
    this.isLoading =false;


     setTimeout(()=>{
      this.errorMeg="";
  },4000);
    
  }});
  

   }
    
  }

 ngOnDestroy(): void {
  //Called once, before the instance is destroyed.
  //Add 'implements OnDestroy' to the class.
  this.signInSub?.unsubscribe();
 }


}
