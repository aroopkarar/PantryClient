import { DataManagerService } from './../services/data-manager.service';
import { Component, OnInit, Input } from '@angular/core';
import { Product, Order } from './../modal/Modals';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {

  @Input()
  products: Array<Product>=[];

  constructor(private dataManagerService: DataManagerService,
  private router: Router) { }
  ngOnInit() {
       this.dataManagerService.getProductsCountInCart(1);
  }

  goToDescriptionPage(productId)
  {
    this.router.navigateByUrl('/productDescription/'+productId);
  }

  addToCart(product: Product)
  {
    let cartId=1;
    console.log('Adding to cart: '+cartId+ ' productId: '+product.id);
    this.dataManagerService.addProductToCart(product,cartId).subscribe((res)=>{
      console.log('Product added to cart');
      this.dataManagerService.getProductsCountInCart(cartId);
    });
  }

}
