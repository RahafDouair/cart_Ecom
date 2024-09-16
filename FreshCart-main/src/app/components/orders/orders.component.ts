import { NgClass } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { OrderService } from '../../core/services/order.service';
import { log } from 'console';

@Component({
  selector: 'app-orders',
  standalone: true,
  imports: [ReactiveFormsModule, NgClass],
  templateUrl: './orders.component.html',
  styleUrl: './orders.component.scss'
})
export class OrdersComponent implements OnInit {
  private cartId:string|null =null;
  private readonly _ActivatedRoute=inject(ActivatedRoute)
  private readonly _OrderService=inject(OrderService)
  orders:FormGroup = new FormGroup({
    
        details: new FormControl(null,[Validators.required]),
        phone:  new FormControl(null,[Validators.required,Validators.pattern(/^01[0125][0-9]{8}$/)]),
        city:  new FormControl(null,[Validators.required])
        
      })
      
      ngOnInit(): void {
       this._ActivatedRoute.paramMap.subscribe({
        next:(res)=>{
         this.cartId=  res.get('id')
        }
       })
      }
      ordersSubmit() {
        this.orders.markAllAsTouched();  
        

    if (this.orders.valid) {
      console.log(this.orders.value);

     this._OrderService. checkOut(this.orders.value,this.cartId!).subscribe({
      next:(res)=>{
            if (res.status=="success") {
              console.log(res);
              window.open(res.session.url,'_self')
            }
            
      },
      error:(err)=>{
        console.log(err);
      }
     }) ;
      }
    
    }

}
