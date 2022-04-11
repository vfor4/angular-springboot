import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from 'src/app/common/product';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product-list-component',
  templateUrl: './product-list-grid.component.html',
  styleUrls: ['./product-list-component.component.css']
})
export class ProductListComponentComponent implements OnInit {


  products!: Product[];
  currentCategoryId!: number;
  currentCategoryName!: string;
  searchMode!: boolean;

  constructor(private productService: ProductService,
              private router: ActivatedRoute) { }

  // such as @PostConstruct
  ngOnInit(): void {
    this.router.paramMap.subscribe(()=>{
      this.listProducts();
    })
  }

  

  listProducts() {
    this.searchMode=this.router.snapshot.paramMap.has('keyword');
    this.searchMode == true ? this.handleSearchProducts(): this.handleListProducts(); 
  }
  
  handleSearchProducts() {
    const theKeyword: string = this.router.snapshot.paramMap.get('keyword')!;

    this.productService.searchProducts(theKeyword).subscribe(
      data => {
        this.products = data;
      }
    )
  }


  handleListProducts(){
    const hasCategoryId: boolean = this.router.snapshot.paramMap.has('id');
    if(hasCategoryId){
        this.currentCategoryId = +this.router.snapshot.paramMap.get('id')!;
        this.currentCategoryName = this.router.snapshot.paramMap.get('name')!;
    }else{
      this.currentCategoryId = 1;
      this.currentCategoryName = 'Books';
    }
    this.productService.getProductList(this.currentCategoryId).subscribe(data => this.products = data);
  }
  

}
