import { Product, Cart } from './../modal/Modals';
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

  //user CartId Copy
  cartId: number;
  
  constructor(private dataManagerService: DataManagerService) { }

  ngOnInit() {
    //this.getCartProducts();
    this.dataManagerService.cart.subscribe((res)=>{
        this.cart=res;
        this.doCartTotal();
    });

    this.dataManagerService.cartId.subscribe((res)=>{
      this.cartId=res;});
  }

  // getCartProducts()
  // {
  //     let cartId=1;
  //     this.dataManagerService.getAllFromCart(cartId)
  //     .subscribe((res)=>{
  //       this.products = res;
  //       this.getSum();
  //     });
  // }

  // getSum()
  // {
  //     this.sum=0;
  //     for(let p of this.products)
  //       {
  //           this.sum= this.sum+p.price;
  //       };
  // }

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
      this.dataManagerService.createOrder(this.cartId);
    }
}
