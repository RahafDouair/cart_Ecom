import { ResolveFn } from '@angular/router';
import { ProductsService } from '../services/products.service';
import { inject } from '@angular/core';

export const detailsResolver: ResolveFn<boolean> = (route, state) => {

  const _ProductsService:ProductsService= inject(ProductsService);

 


  return  _ProductsService.getSpecificProduct(route.paramMap.get('id')!);
};
