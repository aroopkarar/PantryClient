import { Product, Cart, User } from './../modal/Modals';
import { Component, OnInit } from '@angular/core';
import { DataManagerService } from '../services/data-manager.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {

  products: Array<Product>=[];
  sum=0;

  //To store total sum of Cart
  cartTotalSum=0;

  //user Cart Copy
  cart: Cart;

  //user data object
  user: User;

  constructor(private dataManagerService: DataManagerService) { }

  ngOnInit() {

    this.dataManagerService.user.subscribe((res: User)=>{
      this.user=res;
      this.cart=this.user.cart;
      this.doCartTotal();
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


    createOrder()
    {
      console.log('Ready to create order');
      this.dataManagerService.createOrder(this.user);
    }
}
