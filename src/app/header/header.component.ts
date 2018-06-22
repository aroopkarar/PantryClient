import { Component, OnInit } from '@angular/core';
import { DataManagerService } from '../services/data-manager.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(private dataManagerService: DataManagerService,
  private router: Router) { }

  cartCount=0;

  ngOnInit() {
    this.dataManagerService.getProductsCountInCart(1);
    this.dataManagerService.cartCount.subscribe((count)=>{
        this.cartCount=count;
    });
  }

  getCartId()
  {
    return localStorage.getItem('cartId');
  }

  goToAdminPage()
  {
    let adminId= 2;
    this.router.navigateByUrl('/admin/'+adminId);
  }

}
