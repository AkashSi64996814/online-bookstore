import { Injectable } from '@angular/core';
import { CartItem } from '../common/cart-item';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  cartItems: CartItem[] = [];
  totalPrice: Subject<number> = new Subject<number>();
  totalQuantity: Subject<number> = new Subject<number>();

  constructor() { }

  addToCart(theCartItem: CartItem){
    //Check whether book/item is already in the cart.
    let alreadyExistsInCart: boolean = false;
    let existingCartItem: CartItem = undefined;
    if(this.cartItems.length > 0){
      //Find the book/item in the cart based on the id.
      existingCartItem = this.cartItems.find(tempCartItem => tempCartItem.id === theCartItem.id);
      alreadyExistsInCart = (existingCartItem != undefined)
    }

    if(alreadyExistsInCart){
      //Increment the quantity
      existingCartItem.quantity++;
    }else{
      //Add to the cart Items array
      this.cartItems.push(theCartItem);
    }
    this.calculateTotalPrice();
  }

  calculateTotalPrice() {
    let totalPriceValue: number = 0;
    let totalQuantityValue: number = 0;

    //Calculate the total price and total quantity.
    for(let currentCartItem of this.cartItems){
      totalPriceValue += currentCartItem.quantity * currentCartItem.unitPrice;
      totalQuantityValue += currentCartItem.quantity;
    }
    console.log(`Total price : ${totalPriceValue} and total quantity is : ${totalQuantityValue}`);

    //Publish the event
    this.totalPrice.next(totalPriceValue);
    this.totalQuantity.next(totalQuantityValue);
  }

}
