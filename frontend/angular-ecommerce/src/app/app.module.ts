import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { ProductListComponentComponent } from './components/product-list-component/product-list-component.component';
import { HttpClientModule } from '@angular/common/http'
import { ProductService } from './services/product.service';
import { RouterModule, Routes } from '@angular/router';
import { ProductCategoryMenuComponent } from './components/product-category-menu/product-category-menu.component';

const routers: Routes = [
  { path: 'category/:id/:name', component: ProductListComponentComponent },
  { path: 'category', component: ProductListComponentComponent },
  { path: 'products', component: ProductListComponentComponent },
  { path: '', redirectTo: '/products', pathMatch: 'full' },
  { path: '**', redirectTo: '/', pathMatch: 'full'  },
]

@NgModule({
  declarations: [
    AppComponent,
    ProductListComponentComponent,
    ProductCategoryMenuComponent
  ],
  imports: [
    RouterModule.forRoot(routers),
    BrowserModule,
    HttpClientModule
  ],
  providers: [ProductService],
  bootstrap: [AppComponent]
})
export class AppModule { }
