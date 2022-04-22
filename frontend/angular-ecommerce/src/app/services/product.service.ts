import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { ProducCategory } from '../common/produc-category';
import { Product } from '../common/product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private baseUrl: string = "http://localhost:8080/api/products";

  private categoryUrl: string = 'http://localhost:8080/api/product-category';

  constructor(private httpClient: HttpClient) { }

  getProductListPaginate(thePageNumber: number,
    thePageSize: number,
    theCategoryId: number): Observable<getResponseProducts> {

    const searchUrl = `${this.baseUrl}/search/findByCategoryId?id=${theCategoryId}`
      + `&page=${thePageNumber}&size=${thePageSize}`;

    return this.getProducts(searchUrl);
  }

  searchProductsPagination(theKeyword: string,
    thePageSize: number,
    thePageNumber: number): Observable<getResponseProducts> {

    const searchUrl: string = `${this.baseUrl}/search/findByNameContaining?name=${theKeyword}`
      + `&page=${thePageNumber}&size=${thePageSize}`;;

    return this.getProducts(searchUrl);
  }

  getProductCategories(): Observable<ProducCategory[]> {

    return this.httpClient.get<getResponseProductCategory>(this.categoryUrl).pipe(
      map(response => response._embedded.productCategory)
    )
  }

  

  private getProducts(searchUrl: string): Observable<getResponseProducts> {
    return this.httpClient.get<getResponseProducts>(searchUrl);
  }

  // see details product
  getProduct(productId: number): Observable<Product> {
    const productUrl: string = `${this.baseUrl}/${productId}`;
    return this.httpClient.get<Product>(productUrl);
  }


}

export interface getResponseProducts {
  "_embedded": {
    "products": Product[]
  },
  "page": {
    "size": number,
    "totalElements": number,
    "totalPages": number,
    "number": number
  }

}

interface getResponseProductCategory {
  "_embedded": {
    "productCategory": ProducCategory[]
  }
}