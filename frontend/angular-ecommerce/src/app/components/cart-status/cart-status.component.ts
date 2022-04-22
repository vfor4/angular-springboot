import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-cart-status',
  templateUrl: './cart-status.component.html',
  styleUrls: ['./cart-status.component.css']
})
export class CartStatusComponent implements OnInit {

  totalPriceValue: number = 0.00;
  totalQuantityValue: number = 0;
  

  constructor(private cartService:CartService) { }

  ngOnInit(): void {
    this.updateCartStatus();
  }
  updateCartStatus() {
    this.cartService.totalPriceValue.subscribe(data => this.totalPriceValue = data);
    this.cartService.totalQuantityValue.subscribe(data => this.totalQuantityValue = data);
  }

}
