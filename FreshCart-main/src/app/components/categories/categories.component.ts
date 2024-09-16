import { Component, inject, OnDestroy, OnInit, signal, WritableSignal } from '@angular/core';
import { ICategory } from '../../core/interfaces/icategory';
import { Subscription } from 'rxjs';
import { CategoriesService } from '../../core/services/categories.service';

@Component({
  selector: 'app-categories',
  standalone: true,
  imports: [],
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.scss'
})
export class CategoriesComponent implements OnInit,OnDestroy {
  categoriesList:WritableSignal<ICategory[]>=signal<ICategory[]>([]);
  getAllCategoriesSub!:Subscription

  private readonly _CategoriesService =  inject(CategoriesService);

  ngOnInit(): void {
    this.getAllCategoriesSub = this._CategoriesService.getAllCategories().subscribe({
      next:(res)=>{
        console.log(res);
      this.categoriesList.set( res.data)
      // this.spinner.hide()
  
        
      }
      ,
      error:(err)=>{
        console.log(err);
        
      }
    })
  }
 
  ngOnDestroy(): void {
      this.getAllCategoriesSub?.unsubscribe();
   }
   
  
  
}
