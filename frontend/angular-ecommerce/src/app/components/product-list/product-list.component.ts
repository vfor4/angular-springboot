import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from 'src/app/common/product';
import { ProductService } from 'src/app/services/product.service';
import {getResponseProducts} from 'src/app/services/product.service'

@Component({
  selector: 'app-product-list-component',
  templateUrl: './product-list-grid.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {


  products: Product[] = [];
  currentCategoryId: number = 1;
  previousCategoryId: number = 1;
  currentCategoryName!: string;
  searchMode: boolean = false;

  // pagination
  thePageSize: number = 5;
  thePageNumber: number = 1; // angular pagination base at 1
  theTotalElements: number = 0;
  previousKeyword: string = "";


  constructor(private productService: ProductService,
    private router: ActivatedRoute) { }

  // such as @PostConstruct
  ngOnInit(): void {
    this.router.paramMap.subscribe(() => {
      this.listProducts();
    })
  }

  listProducts() {
    this.searchMode = this.router.snapshot.paramMap.has('keyword');
    this.searchMode == true ? this.handleSearchProducts() : this.handleListProducts();
  }

  handleSearchProducts() {
    const theKeyword: string = this.router.snapshot.paramMap.get('keyword')!;

    if(this.previousKeyword != theKeyword){
      this.thePageNumber = 1;
    }
    this.previousKeyword = theKeyword;

    console.log(`keyword = ${this.previousKeyword}, thePageNumber=${this.thePageNumber}`);

    this.productService.searchProductsPagination(theKeyword, this.thePageSize, this.thePageNumber-1)
    .subscribe(this.processResult());
  }


  handleListProducts() {
    const hasCategoryId: boolean = this.router.snapshot.paramMap.has('id');
    if (hasCategoryId) {
      this.currentCategoryId = +this.router.snapshot.paramMap.get('id')!;
      this.currentCategoryName = this.router.snapshot.paramMap.get('name')!;
    } else {
      this.currentCategoryId = 1;
      this.currentCategoryName = 'Books';
    }

    if (this.previousCategoryId != this.currentCategoryId) {
      this.thePageNumber = 1;
    }

    this.previousCategoryId = this.currentCategoryId;


    this.productService.getProductListPaginate(this.thePageNumber - 1,
      this.thePageSize,
      this.currentCategoryId)
      .subscribe(this.processResult());

  }
  processResult() {
    return (data: getResponseProducts) =>{
      this.products = data._embedded.products;
      this.thePageNumber = data.page.number + 1;
      this.thePageSize = data.page.size;
      this.theTotalElements = data.page.totalElements; 
    }
  }

  updatePageSize(thePageSize: number){
    this.thePageSize = thePageSize;
    this.thePageNumber = 1;
    this.listProducts();
  }


}
