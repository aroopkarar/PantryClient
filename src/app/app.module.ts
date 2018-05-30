import { DataManagerService } from './services/data-manager.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {HttpModule} from '@angular/http';

import { AppComponent } from './app.component';
import {FormsModule} from '@angular/forms'; 
import {RouterModule, RouterStateSnapshot} from '@angular/router';

import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { DescpritionComponent } from './descprition/descprition.component';
import { HttpClientModule } from '@angular/common/http';
import { ProductComponent } from './product/product.component';

import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { CategoryComponent } from './category/category.component';
import { CartComponent } from './cart/cart.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { PageManagerService } from './services/page-manager.service';
import { AdminhomeComponent } from './admin/adminhome/adminhome.component';
import { AdminadduserComponent } from './admin/adminadduser/adminadduser.component';
import { AdminaddproductComponent } from './admin/adminaddproduct/adminaddproduct.component';
import { AdminorderComponent } from './admin/adminorder/adminorder.component';
import { AnalyticsComponent } from './admin/analytics/analytics.component';
import { AuthGuard } from './guards/auth-guard.service';
import { AdminGuard } from './guards/admin-guard.service';
import { OrdersucessComponent } from './ordersucess/ordersucess.component';
import { MyordersComponent } from './myorders/myorders.component';

import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { ProductDescriptionComponent } from './product-description/product-description.component';

import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    HeaderComponent,
    FooterComponent,
    DescpritionComponent,
    ProductComponent,
    CategoryComponent,
    CartComponent,
    CheckoutComponent,
    AdminhomeComponent,
    AdminadduserComponent,
    AdminaddproductComponent,
    AdminorderComponent,
    AnalyticsComponent,
    OrdersucessComponent,
    MyordersComponent,
    ProductDescriptionComponent
  ],
  imports: [
    MatProgressSpinnerModule,
    BrowserModule,
    // HttpModule,
    HttpClientModule,
    BrowserAnimationsModule,
    FormsModule,
    BsDropdownModule.forRoot(),
    NgbModule.forRoot(),
    RouterModule.forRoot([
      {path:'',component:DescpritionComponent},
      {path:'cart',component:CartComponent},
      {path:'checkout',component:CheckoutComponent},
      {path:'myorders',component:MyordersComponent},
      {path:'ordersuccess',component:OrdersucessComponent},
      {path:'productDescription/:id',component:ProductDescriptionComponent,},
      {path:'admin/:id',component:AdminhomeComponent,
          children: [
            { path: '', redirectTo: 'analytics', pathMatch: 'full' },
            { path:'analytics',component:AnalyticsComponent },
            { path: 'addproduct', component: AdminaddproductComponent },
            { path: 'adduser', component: AdminadduserComponent },
            { path: 'userOrders', component: AdminorderComponent }
          ], canActivate:[AdminGuard]
      },
      
    ])
  ],

  providers: [DataManagerService,PageManagerService,AuthGuard,AdminGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
