import { DataManagerService } from './../services/data-manager.service';
import { Component, OnInit } from '@angular/core';
import { Product, OrderLine } from '../modal/Modals';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  //Array to Store Products in the user cart
  cartProducts: Array<Product>=[];
 
  //To store total sum of Cart
  cartTotalSum=0;

  constructor(private dataManagerService: DataManagerService) {
    this.dataManagerService.generateOrderLines();
   }

  ngOnInit() {
    //Getting Products from User Cart
    let cartId=1;
    this.dataManagerService.getProductsInCart(cartId)
    .subscribe((res)=>{
      this.cartProducts = res;
      this.initializeCart();
      this.doCartTotal();
    });
  }

  initializeCart()
  {
      this.cartProducts.forEach(p=>{
        p.quantity=1;
      })
  }

  getCartProducts()
  {
    console.log('cartProducts= '+this.cartProducts);
  }

  //Cart: Method to do Cart Total
  doCartTotal()
  {
      this.cartTotalSum=0;
      for(let p of this.cartProducts)
        {
            this.cartTotalSum= this.cartTotalSum+(p.price*p.quantity);
        };
  }

  //Cart: Method to remove a specific product from Cart
  removeFromCart(productId: number)
  {
    let cartId =1;
    this.dataManagerService.removeProductFromCart(this.cartProducts[productId],cartId)
    .subscribe((res)=>{
      //console.log('Remove products '+this.cartProducts[productId].id+ ' in cart: '+cartId);
      this.cartProducts.splice(productId,1)[0];
      //this.removeProductFromOrder(productId);
      console.log('Got products after removing  in cart: '+JSON.stringify(this.cartProducts));
      this.doCartTotal();
    });
  }

  //Order Lines: Method to add a product to
  addProductToOrder(productIndex)
  {

  }

  //Order Lines: Method to remove a product from
  removeProductFromOrder(productNumber)
  {

  }


  //Cart: Method to increase Product Quantity
  increaseProductQuantity(productNumber)
  {
    this.cartProducts[productNumber].quantity++;
    this.doCartTotal();
  }

  //Cart: Method to decrease Product Quantity
  decreaseProductQuantity(productNumber)
  {
    if(this.cartProducts[productNumber].quantity>1)
    this.cartProducts[productNumber].quantity--;
    this.doCartTotal();
  }

}
