import { Product } from './../modal/Modals';
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
  constructor(private dataManagerService: DataManagerService) { }

  ngOnInit() {
    this.getCartProducts();
  }

  getCartProducts()
  {
      let cartId=1;
      this.dataManagerService.getProductsInCart(cartId)
      .subscribe((res)=>{
        this.products = res;
        this.getSum();
      });
  }

  getSum()
  {
      this.sum=0;
      for(let p of this.products)
        {
            this.sum= this.sum+p.price;
        };
  }

  createOrder()
  {
    this.dataManagerService.createOrder(1);
  }

}
