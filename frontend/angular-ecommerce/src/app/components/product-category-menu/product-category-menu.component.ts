import { Component, OnInit } from '@angular/core';
import { ProducCategory } from 'src/app/common/produc-category';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product-category-menu',
  templateUrl: './product-category-menu.component.html',
  styleUrls: ['./product-category-menu.component.css']
})
export class ProductCategoryMenuComponent implements OnInit {

  productCategory!: ProducCategory[];

  constructor(private productService: ProductService) { }

  ngOnInit(): void {
    this.listProductCategories();
  }

  listProductCategories() {
    this.productService.getProductCategories().subscribe(
      (data) => {console.log(data);
      this.productCategory = data;}
    );
  }
  

}
