import { AuthService } from './../../core/services/auth.service';
import { NgClass } from '@angular/common';
import { AbstractType, Component, inject, OnDestroy } from '@angular/core';
import { AbstractControl, AbstractControlOptions, AbstractFormGroupDirective, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { error } from 'console';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule,NgClass],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent implements OnDestroy {
 

  registerForm:FormGroup =new FormGroup({
    name:new FormControl(null,[Validators.required,Validators.minLength(6),Validators.maxLength(20)]),
    email:new FormControl(null,[Validators.email,Validators.required]),
    password:new FormControl(null,[Validators.required,Validators.pattern(/^\w{6,}$/)]),
    phone:new FormControl(null,[Validators.required,Validators.pattern(/^01[0125][0-9]{8}$/)]),
    rePassword:new FormControl(null),

  },this.confirmPassword)

   private _AuthService =inject(AuthService);
   private _Router =inject(Router);
   errorMeg:string="";
   isLoading:boolean=false;
   isSuccess:boolean=false;

   signUpSub!:Subscription;


  registerSubmit(){
   
   
   
  
   if (this.registerForm.valid) {
    this.isLoading=true;
     this.signUpSub=this._AuthService.signUp(this.registerForm.value).
  subscribe( {next:(data)=>{
  console.log(data)
  this.isLoading =false;
  
  if (data.message=='success') {
    this._Router.navigate(["/login"]) 
    this.isSuccess=true;
    setTimeout(()=>{
      this.isSuccess=false;
  },2000);
  }

  // this._Router.navigate(["/login",1000])

  },
  error:(err)=>{
    console.log(err.error.message);
    this.errorMeg=err.error.message;
    this.isLoading =false;


     setTimeout(()=>{
      this.errorMeg="";
  },4000);
    
  }});
  

   }else{
    this.registerForm.markAllAsTouched()
    this.registerForm.setErrors({mismatch:true})
   }
    
  }

  confirmPassword(g:AbstractControl){

    if (g.get('password')?.value ==g.get('rePassword')?.value ) {
      return null
    }
    
    return {mismatch: true};
  }

  ngOnDestroy(): void {
    this.signUpSub?.unsubscribe()
  }

}


