import { CartItem } from './../modal/Modals';
import { DataManagerService } from './../services/data-manager.service';
import { Component, OnInit } from '@angular/core';
import { Product, OrderLine, Cart } from '../modal/Modals';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
 
  //To store total sum of Cart
  cartTotalSum=0;

  //user Cart Copy
  cart: Cart;

  //user CartId Copy
  cartId: number;
  constructor(private dataManagerService: DataManagerService) {
      
   }

  ngOnInit() {

        this.dataManagerService.getCart(1);

        this.dataManagerService.cartId.subscribe((res)=>{
          this.cartId=res;

          //Getting Products from User Cart
          this.dataManagerService.cart.subscribe((res)=>{
          this.cart=res;
          this.doCartTotal();
        });
        });
  }


  //Cart: Method to do Cart Total
  doCartTotal()
  {
      this.cartTotalSum=0;
      for(let cartItem of this.cart.cartItems)
        {
            this.cartTotalSum= this.cartTotalSum+(cartItem.product.price*cartItem.quantity);
        };
  }

  //Cart: Method to remove a specific product from Cart
  removeProductFromCart(item: CartItem)
  {
    this.dataManagerService.removeProductFromCart(item.product.id,this.cartId)
    .subscribe((res)=>{
      this.cart.cartItems=this.cart.cartItems.filter(citem=>{
        return citem.id!=item.id;
      })
      this.dataManagerService.cart.next(this.cart);
      this.dataManagerService.getCart(this.cartId);
      this.dataManagerService.getProductsCountInCart(this.cartId);
      console.log('After removing product from cart: '+JSON.stringify(this.cart));
    });
  }

  //Cart: Method to increase Product Quantity
  increaseProductQuantity(itemNumber)
  {
    this.cart.cartItems[itemNumber].quantity++;
    this.dataManagerService.cart.next(this.cart);
    this.updateCartItem(itemNumber);
  }

  //Cart: Method to decrease Product Quantity
  decreaseProductQuantity(itemNumber)
  {
    if(this.cart.cartItems[itemNumber].quantity>1)
    {
        this.cart.cartItems[itemNumber].quantity--;
        this.dataManagerService.cart.next(this.cart);
        this.updateCartItem(itemNumber);
    }
  }

  updateCartItem(itemNumber: number)
  {
    console.log('updating cart Item: '+itemNumber);
    this.dataManagerService.updateCartItem(this.cart.cartItems[itemNumber]);
  }
}
