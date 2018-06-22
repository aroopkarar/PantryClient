export class Address
{
    addressId: number;
    addressline1: string;
    addressline2: string;
    dateAdded : Date;
    dateModified: Date;
    user: User;
    country: Country;
    city: City;
    zip: Zip;
}

export class Cart{
    cartId: number;
    dateCreated: Date;
    products: Array<Product>;
}

export class Category
{
    categoryId: number;
    categoryName: string;
    dateAdded: Date;
    dateModified: Date;
    isActive: boolean;
    categoryGroupId: number;
    subcategories: Array<Subcategory>;
}

export class CategoryGroup
{
    groupId: number;
    groupName: string;
    categories: Array<Category>;
}

export class City
{
    id: number;
    name: string;
    state: State ;
    zips: Array<Zip> ;
}

export class Country{
    id: number;
    code: string;
    name: string;
    vatPercent: number;
    currencyCode: string;
    states: Array<State> ;
}

export class Invoice{
    id: number;
    invoiceNumber: string;
    dateAdded: Date;
} 

export class OrderLine
{
     id :  number;
     orderId : string;
     product: Product;
     quantity: number;
     totalPrice: number;
}

export class Order
{
    id : number;
    status : OrderStatus;
    dateAdded : Date;
    dateModified : Date;
    modifiedBy: number;
    shippingCharge: number;
    orderlines : Array<OrderLine>;
    user: User;
    paymentType: PaymentType;
    invoice: Invoice;
}

export class OrderStatus
{
    id: number;
    name: string;
    description: string;
}

export class PaymentType{
    id: number;
    code: string;
    name: string;
    description: string;
}

export class Product
{
    id: number;
    name: string;
    price: number;
    quantity: number;
    description: string;
    subcategoryId: number;
    imageUrl: string;
    hasOffer: boolean;
    offerPercent: number;
    addedBy: number;
    dateAdded: Date;
    modifiedBy: number;
    dateModified: Date;
    isActive: Boolean;
    carts: Array<Cart>;

}

export class State{
    id: number;
    name: string;
    country: Country;
    cities: Array<City>;
}
export class Subcategory
{
    subcategoryId: number;
    subcategoryName: string;
    categoryId: number;
    dateAdded: Date;
    dateModified: Date;
    isActive: boolean;
    products: Array<Product>;
}

export class User
{
    id:string;
    password:string;
    username:string;
    firstname:string;
    lastname:string;
    mobile:string;
    email:string;
    imageUrl:string;
    isAdmin:boolean;
    dateAdded:Date;
    addedBy: number;
    modifiedBy: number;
    dateModified:Date;
    cart : Cart;
    addresses: Array<Address>;
    orders: Array<Order>;
}

export class Zip{
    id: number;
    zipCode: number;
    city: City;     
}