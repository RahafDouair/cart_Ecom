import { resolve } from 'node:path';
import { detailsResolver } from './core/guards/details.resolver';
import { ProductComponent } from './components/product/product.component';
import { Component } from '@angular/core';
import { Routes } from '@angular/router';

// Assuming your guards are still imported properly

import { AuthLayoutComponent } from './layouts/auth-layout/auth-layout.component';
import { BlankLayoutComponent } from './layouts/blank-layout/blank-layout.component';
import { logedGuard } from './core/guards/loged.guard';
import { authGuard } from './core/guards/auth.guard';
import { NotfoundComponent } from './components/notfound/notfound.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';

export const routes: Routes = [
  {
    path: '',
    component: AuthLayoutComponent,
    canActivate: [logedGuard],
    children: [
      { path: '', redirectTo: 'login', pathMatch: 'full' },
      {
        path: 'login',
        component:LoginComponent,
        title: 'login'
      },
      {
        path: 'register',
        loadComponent: () =>
          import('./components/register/register.component').then(m => m.RegisterComponent),
        title: 'register'
      },
      {
        path: 'forgot',
        loadComponent: () =>
          import('./components/forget-password/forget-password.component').then(m => m.ForgetPasswordComponent),
        title: 'forgot'
      }
    ]
  },
  {
    path: '',
    component: BlankLayoutComponent,
    canActivate: [authGuard],
    children: [
      { path: '', redirectTo: 'home', pathMatch: 'full' },
      {
        path: 'home',
       component:HomeComponent,
        title: 'home'
      },
      {
        path: 'products',
        component:ProductComponent,
        title: 'products'
      },
      {
        path: 'cart',
        loadComponent: () =>
          import('./components/cart/cart.component').then(m => m.CartComponent),
        title: 'cart'
      },
      {
        path: 'wishlist',
        loadComponent: () =>
          import('./components/wish-list/wish-list.component').then(m => m.WishListComponent),
        title: 'wishlist'
      },
      {
        path: 'brands',
        loadComponent: () =>
          import('./components/brands/brands.component').then(m => m.BrandsComponent),
        title: 'brands'
      },
      {
        path: 'categories',
        loadComponent: () =>
          import('./components/categories/categories.component').then(m => m.CategoriesComponent),
        title: 'categories'
      },
      {
        path: 'details/:id',
        loadComponent: () =>
          import('./components/details/details.component').then(m => m.DetailsComponent),
        title: 'details',
        resolve:{myRes:detailsResolver}
      },
      {
        path: 'allorders',
        loadComponent: () =>
          import('./components/all-orders/all-orders.component').then(m => m.AllOrdersComponent),
        title: 'allorders'
      },
      {
        path: 'orders/:id',
        loadComponent: () =>
          import('./components/orders/orders.component').then(m => m.OrdersComponent),
        title: 'orders'
      }
    ]
  },
  {
    path: '**',
    component: NotfoundComponent , title: 'NotFound'// or use loadComponent for lazy loading this as well,
    
  }
];
