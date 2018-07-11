import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Cart, Orders, OrderLine, CartItem } from './../modal/Modals';
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
  //Stores User Cart
  cart=new BehaviorSubject<Cart>(null);
  //Stores User CartId
  cartId=new BehaviorSubject<number>(1);

  //Stores User Details
  userId=new BehaviorSubject<number>(1);
  user =new BehaviorSubject<User>(null);

  //Order object
  order: Orders= new Orders();

  //Instantiating Order lines for a Order
  constructor(private http: HttpClient) { 
    this.getCart(this.cartId.getValue());
    this.getUser(this.userId.getValue());
  }

  products: Array<Product>;

  //Temporary**
  public isValidUser()
  {
    if(!this.isValid)
    localStorage.removeItem('JWT');
    console.log('isValid: ',this.isValid);
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
  addProductToCart(productId: number, cartId: number) {
   let queryParam = '?productId='+productId+'&cartId='+cartId;
   return this.http.get(this.getRelativePath('/addToCart'+queryParam));
  }

  //Method to remove product from user cart
  removeProductFromCart(productId:number, cartId: number) {
    let queryParam = '?productId='+productId+'&cartId='+cartId;
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

  //Method to create a new Order
  createOrder(user:User)
  {
    let queryParam = '?userId='+user.id;
    this.http.get<Orders>(this.getRelativePath("/createOrder")+queryParam).subscribe(
      res=>{
        this.order= res;
        console.log('Order created: '+this.order.id);
        this.clearCart(user.cart.id);
      }
    );
  }

   //Method to get products present in Cart for CartComponent
   getAllFromCart(cartId: number)
   {
    let queryParam = '?cartId='+cartId; 
    return this.http.get<Product[]>(this.getRelativePath('/getAllFromCart'+queryParam));
   }

   getCart(cartId: number)
   {
    let queryParam = '?cartId='+cartId; 
    this.http.get<Cart>(this.getRelativePath('/getCart'+queryParam))
      .subscribe((res)=>{
      this.cart.next(res);
    });
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

   //User : Method to create a new User
   createUser(user: User)
   {
    this.http.post<User>(this.getRelativePath('/createUser'),user)
    .subscribe(res=>{
        console.log('User Created: '+JSON.stringify(res));
    });
   }

   updateCartItem(cartItem: CartItem)
   {
    this.http.post<CartItem>(this.getRelativePath('/updateCartItem'),cartItem)
    .subscribe(res=>{
        console.log('CartItem Updated: '+JSON.stringify(res));
    });
   }

   getUser(userId: number)
   {
      let queryParam = '?userId='+userId; 
      this.http.get<User>(this.getRelativePath('/getUserById'+queryParam)).subscribe((res)=>{
        this.user.next(res);
        this.cart.next(res.cart);
      })
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
