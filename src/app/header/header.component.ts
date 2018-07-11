import { Component, OnInit } from '@angular/core';
import { DataManagerService } from '../services/data-manager.service';
import { Router } from '@angular/router';
import { User } from '../modal/Modals';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(public dataManagerService: DataManagerService,
  private router: Router) { }

  cartCount=0;
  user: User;
  ngOnInit() {
    this.dataManagerService.getProductsCountInCart(1);
    this.dataManagerService.cartCount.subscribe((count)=>{
        this.cartCount=count;
    });

    this.dataManagerService.user.subscribe((res)=>{
      this.user=res;
    })
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

  logout()
  {
    console.log('logging out user');
    this.dataManagerService.isValid=false;
  }
}
