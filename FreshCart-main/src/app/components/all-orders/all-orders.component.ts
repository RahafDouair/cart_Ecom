import { Component, inject, OnInit } from '@angular/core';
import { ICart } from '../../core/interfaces/icart';
import { IOrder } from '../../core/interfaces/iorder';
import { CurrencyPipe, DatePipe } from '@angular/common';
import { OrderService } from '../../core/services/order.service';

@Component({
  selector: 'app-all-orders',
  standalone: true,
  imports: [CurrencyPipe,DatePipe],
  templateUrl: './all-orders.component.html',
  styleUrl: './all-orders.component.scss'
})
export class AllOrdersComponent implements OnInit{

private readonly _OrderService:OrderService=inject(OrderService)

  orders:IOrder[]=[];


  ngOnInit(): void {
    this._OrderService.getUserOrders().subscribe({
      next:(res)=>{
        console.log(res);
        this.orders= res;
      },
      error:(err)=>{
        console.log(err);
        
      }
    })
    

  }

}
