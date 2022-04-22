import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { CartItem } from '../common/cart-item';
import { Product } from '../common/product';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  cartItems: CartItem[] = [];
  totalPriceValue: Subject<number> = new Subject<number>();
  totalQuantityValue: Subject<number> = new Subject<number>();

  constructor() { }

  addToCart(theCartItem: CartItem) {
    
    let alreadyExistsInCart: boolean = false;
    let existingCartItem: CartItem | undefined = undefined;

    if (this.cartItems.length > 0) {
      for (let tempCartItem of this.cartItems) {
        if (theCartItem.id == tempCartItem.id) {
          existingCartItem = tempCartItem;
          break;
        }
      }
    }

    // importance ==========================================
    alreadyExistsInCart = (existingCartItem != undefined);
    if (alreadyExistsInCart) {
      existingCartItem!.quantity++;
    } else {
      this.cartItems.push(theCartItem);
    }
    
     //======================================================
    this.calculateTotalPrice();
    }

  calculateTotalPrice() {

    let totalPriceValue: number = 0;
    let totalQuantityValue: number = 0;

    for (const tempCartItem of this.cartItems) {
      totalPriceValue += tempCartItem.quantity *tempCartItem.unitPrice;
      totalQuantityValue += tempCartItem.quantity;
    }
    
    this.totalPriceValue.next(totalPriceValue);
    this.totalQuantityValue.next(totalQuantityValue);

  }
}
