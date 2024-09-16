import { Component, inject, signal, WritableSignal } from '@angular/core';
import { BrandService } from '../../core/services/brand.service';
import { Subscription } from 'rxjs';
import { ICategory } from '../../core/interfaces/icategory';

@Component({
  selector: 'app-brands',
  standalone: true,
  imports: [],
  schemas:[]
  ,
  templateUrl: './brands.component.html',
  styleUrl: './brands.component.scss'
})
export class BrandsComponent {

  brandsList:WritableSignal<ICategory[]>=signal<ICategory[]>([]);
  getAllBrandsSub!:Subscription

  private readonly _BrandService =  inject(BrandService);

  ngOnInit(): void {
    this.getAllBrandsSub = this._BrandService.getAllBrands().subscribe({
      next:(res)=>{
        console.log(res);
      this.brandsList.set( res.data)
      // this.spinner.hide()
  
        
      }
      ,
      error:(err)=>{
        console.log(err);
        
      }
    })
  }
 
  ngOnDestroy(): void {
      this.getAllBrandsSub?.unsubscribe();
   }
   
  



}
