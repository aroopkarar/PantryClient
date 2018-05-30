import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Cart, Orders, OrderLine } from './../modal/Modals';
import { Injectable } from '@angular/core';
import {RequestOptions, Http } from '@angular/http';
import { environment } from '../../environments/environment';
import 'rxjs/add/operator/map';
import {User, Product} from '../modal/Modals'
import { HttpClient, HttpHeaders, HttpResponse } from "@angular/common/http";
import { Observable } from 'rxjs/Observable';
@Injectable()
export class DataManagerService {

  //isValid/isAdmin Temporary**
  public isValid: boolean = false;
  private isAdmin: boolean = true;

  //count behaviour subject to keep track of the number of product in cart
  cartCount =new BehaviorSubject<number>(0);

  //order object
  public order: Orders= new Orders();

  //productNumber represent the cart productNo
  cartProductNumber: number=0;

  //Instantiating order lines for a order
  constructor(private http: HttpClient) { 
    this.order.orderlines = new Array<OrderLine>();
  }

  products: Array<Product>;

  //Temporary**
  public isValidUser()
  {
    return this.isValid;
  }

  //Temporary**
  public isAdminUser()
  {
    return this.isAdmin;
  }

  //Method to check userName already exists on server
  checkUserId(userName: string): any {
    return this.http.get(this.getRelativePath("/getUserByUserName")
                        +"?userName="+userName);
  }

  //Method to get AllProducts for HomeDescription Page
  public getProducts()
  {  
    return this.http.post<Product[]>(this.getRelativePath("/getAllProducts"),null)
    .subscribe((res)=>{
      this.products= res;
    })
  }

  //Method to get All category groups for category Component
  getCategoryGroup()
  {
    return this.http.get(this.getRelativePath("/getAllCategoryGroups"));
  }

  //Method to get all products based on Category Group
  getProductsByCategoryGroup(groupId)
  {
    return this.http.get<Product[]>(this.getRelativePath("/getProductsByCategoryGroup"+"?groupId="+groupId))
    .subscribe((res)=> {
      this.products= res;
      console.log('products1= '+JSON.stringify(this.products));
    }
    );
  }

  //Method to get all Prodcuts based on Group Id and Category Id  
  getProductsByCategoryGroupAndCategory(groupId,categoryId)
  {
    return this.http.get<Product[]>(this.getRelativePath("/getProductsByCategoryGroupAndCategory"+
    "?groupId="+groupId+"&categoryId="+categoryId))
    .subscribe((res)=> 
    {
      this.products= res;
      console.log('products2= '+JSON.stringify(this.products));
    });
  }

  headers;

  //Method to set JWT in the Authorization header
  setHeaders()
  {
    let httpheaders = new HttpHeaders();
    httpheaders = httpheaders.set('Content-Type', 'application/json; charset=utf-8').set('Authorization',localStorage.getItem('JWT'));
    console.log('localstorage: '+localStorage.getItem('JWT'));
    console.log('this.headers= '+JSON.stringify(httpheaders));
    return httpheaders;
  }

  //Method to check user credentials and return the JWT token in header
  public loginUser(user: User): Observable<HttpResponse<User>> 
  {
    let httpHeaders = new HttpHeaders({
      'Content-Type' : 'application/json'
     }); 

    return this.http.post<User>(this.getRelativePath("/loginUser"),user,{
      headers:httpHeaders,
      observe: 'response'
    });
  }

  //Method to add product to user cart
  addProductToCart(product: Product, cartId: number) {
   let queryParam = '?productId='+product.id+'&cartId='+cartId;
   //console.log('Controller to hit: '+(this.getRelativePath('/addToCart'+queryParam)));
   return this.http.get(this.getRelativePath('/addToCart'+queryParam));
  }

  generateOrderLines()
  {
    this.cartProductNumber=0;
    if(this.cartCount.getValue()>0)
    {
    let productLines: Array<Product>;
    this.getProductsInCart(1).subscribe(res=>{
      productLines=res;
      productLines.forEach(product=>{
        this.order.orderlines[this.cartProductNumber]=new OrderLine();
        this.order.orderlines[this.cartProductNumber].product=product;
        this.order.orderlines[this.cartProductNumber].quantity=1;
        this.order.orderlines[this.cartProductNumber].totalPrice=product.price;
        this.cartProductNumber++;
      });
      console.log('Generate Order lines for a cart');
    });
   }
   else
   console.log('Order lines not generated for a cart');
  }

  removeProductLine(product: Product)
  {
    console.log('Product removed from Order Line');
  }

  //Method to remove product from user cart
  removeProductFromCart(product: Product, cartId: number) {
    let queryParam = '?productId='+product.id+'&cartId='+cartId;
    this.removeProductLine(product);
    return this.http.get(this.getRelativePath('/removeFromCart'+queryParam));
   }

   //Method to clear specific user cart
   clearCart(cartId)
   {
    let queryParam = '?cartId='+cartId;
    this.http.get(this.getRelativePath('/clearCart'+queryParam))
    .subscribe(res=>{
      console.log('Cleared the Cart');
    });
   }

  //Method to create a new order
  createOrder(cartId: number)
  {
    console.log('Order object: '+JSON.stringify(this.order));
    this.http.post<Orders>(this.getRelativePath("/createOrder"),this.order).subscribe(
      res=>{
        this.order= res;
        console.log('Order created: '+this.order.id);
        this.clearCart(cartId);
      }
    );
  }

   //Method to get products present in Cart for CartComponent
   getProductsInCart(cartId: number)
   {
    let queryParam = '?cartId='+cartId; 
    return this.http.get<Product[]>(this.getRelativePath('/getAllFromCart'+queryParam));
   }

   //Method to find the products count in the cart
   getProductsCountInCart(cartId: number)
   {
    let queryParam = '?cartId='+cartId;
    this.http.get<number>(this.getRelativePath('/getCartCount'+queryParam))
    .subscribe(res=>{
      this.cartCount.next(res);
    });
   }

  // Get complete path to endpoint irrespective of application host. 
  getRelativePath(path) {
    var protocol = window.location.protocol;
    var slashes = protocol.concat("//");
    var host = slashes.concat(window.location.hostname);
    if (environment.deployable) {
      var url = host + (window.location.port.length > 0 ? ":" + window.location.port : '') + path;
      return url;
    }
    else {
      var url2 = "http://localhost:7070" + path;
      return url2;
    }
  }

}
