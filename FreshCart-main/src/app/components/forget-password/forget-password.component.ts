import { NgClass } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormControl, FormControlName, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../core/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-forget-password',
  standalone: true,
  imports: [ReactiveFormsModule,NgClass],
  templateUrl: './forget-password.component.html',
  styleUrl: './forget-password.component.scss'
})
export class ForgetPasswordComponent {
  step :number =1;
  isLoading:boolean=false;
  errorMeg:string="";
  isSuccess:boolean=false;
  private readonly _AuthService:AuthService =inject(AuthService);
  private readonly _Router:Router =inject(Router);



verfiyEmail:FormGroup = new FormGroup(
    {
     email: new FormControl(null,[Validators.required,Validators.email])
    }
  )
verfiyCode:FormGroup = new FormGroup(
    {
     resetCode: new FormControl(null,[Validators.required,Validators.pattern(/^\w{6}$/)])
    }
  )
  resetPassword:FormGroup=new FormGroup(
    {
      email: new FormControl(null,[Validators.required,Validators.email]),

      newPassword: new FormControl(null,[Validators.required,Validators.pattern(/^\w{6,}$/)]),

    }
  )
  verfiyEmailSubmit():void{
    this.isLoading = true;
    this._AuthService.setEmailVarfiy(this.verfiyEmail.value).subscribe({
      next:(res)=>{
        if (res.statusMsg =='success') {
          this.isSuccess =true;

          this.resetPassword.get('email')?.patchValue(this.verfiyEmail.get('email')?.value)
          
          setTimeout(()=>{
            this.isSuccess=false;
            this.isLoading = false;

            this.step=2;
        },2000);
          // console.log(res)
        }
       
      },
      error:(err)=>{
     console.log(err.error.message);
          this.errorMeg=err.error.message;
          this.isSuccess=false;
            this.isLoading = false;
            setTimeout(()=>{
              this.errorMeg="";

            },3000);
      }
    })  }

    verfiyCodeSubmit():void{
      this.isLoading = true;
      this._AuthService.setCodeVarfiy(this.verfiyCode.value).subscribe({
        next:(res)=>{
          if (res.status =='Success') {
            this.isSuccess =true;
            setTimeout(()=>{
              this.isSuccess=false;
              this.isLoading = false;

              this.step=3;
            },2000);
            console.log(res)
          }
         
        },
        error:(err)=>{
          console.log(err.error.message);
          this.errorMeg=err.error.message;
          this.isSuccess=false;
            this.isLoading = false;
            setTimeout(()=>{
              this.errorMeg="";

            },3000);
        }
      })  }
    
      resetPasswordSubmit():void{
      this.isLoading = true;
      this._AuthService.setResetPassword(this.resetPassword.value).subscribe({
        next:(res)=>{
          this.isSuccess =true;
          this._AuthService.saveUserData()
          localStorage.setItem('userToken',res.token)

          setTimeout(()=>{
            this.isSuccess=false;
            this.isLoading = false;

            this._Router.navigate(['/home'])
          },2000);
            
            
          
         
        },
        error:(err)=>{
          console.log(err.error.message);
          this.errorMeg=err.error.message;

          this.isSuccess=false;
            this.isLoading = false;
          

            setTimeout(()=>{
              this.errorMeg="";

            },2000);
        }
      })  }

}
