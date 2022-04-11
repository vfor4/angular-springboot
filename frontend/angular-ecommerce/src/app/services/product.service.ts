import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { ProducCategory } from '../common/produc-category';
import { Product } from '../common/product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  

  private baseUrl:string = "http://localhost:8080/api/products"; 

  private categoryUrl:string = 'http://localhost:8080/api/product-category';

  constructor(private httpClient: HttpClient) { }

  getProductList(theCategoryId: number): Observable<Product[]>{

    const searchUrl = `${this.baseUrl}/search/findByCategoryId?id=${theCategoryId}`;

    return this.httpClient.get<getResponseProducts>(searchUrl).pipe(
      map(response=> response._embedded.products)
    )
  }

  getProductCategories(): Observable<ProducCategory[]>{


    return this.httpClient.get<getResponseProductCategory>(this.categoryUrl).pipe(
      map(response=> response._embedded.productCategory)
    )
  }

}

interface getResponseProducts{
  "_embedded":{
    "products": Product[]
  }
}

interface getResponseProductCategory{
  "_embedded":{
    "productCategory": ProducCategory[]
  }
}