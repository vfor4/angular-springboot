import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Product } from '../common/product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private baseUrl:string = "http://localhost:8080/api/products"; 

  constructor(private httpClient: HttpClient) { }

  getProductList(theCategoryId: number): Observable<Product[]>{

    const searchUrl = `${this.baseUrl}/search/findByCategoryId?id=${theCategoryId}`;

    return this.httpClient.get<getResponse>(searchUrl).pipe(
      map(response=> response._embedded.products)
    )
  }

}

interface getResponse{
  "_embedded":{
    "products": Product[]
  }
}
