import { DataManagerService } from './../../services/data-manager.service';
import { User, Cart } from '../../modal/Modals';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-adminadduser',
  templateUrl: './adminadduser.component.html',
  styleUrls: ['./adminadduser.component.css']
})
export class AdminadduserComponent implements OnInit, OnDestroy  {

  parentRouteId: number;
  private sub: any;

  user: User;
  constructor(private dataManagerService: DataManagerService,
    private route: ActivatedRoute) { }

  ngOnInit() {
    // Get parent ActivatedRoute of this route.
    this.sub = this.route.parent.params.subscribe(params => {
      this.parentRouteId = +params["id"];
      console.log('Getting Parent param admin id: '+this.parentRouteId);
    });
  }
  createUser(formdata)
  {
    console.log('data='+JSON.stringify(formdata.value));
    this.user=new User();
    this.user.username=formdata.value.username;
    this.user.password=formdata.value.password;
    this.user.firstname=formdata.value.firstname;
    this.user.lastname=formdata.value.lastname;
    this.user.mobile=formdata.value.mobile;
    this.user.email=formdata.value.email;
    this.user.imageUrl=formdata.value.imageUrl;
    this.user.isAdmin=formdata.value.isAdmin;
    this.user.dateAdded= new Date();
    this.user.dateModified=new Date();
    this.user.addedBy=this.parentRouteId;
    this.user.modifiedBy=this.parentRouteId;

    this.user.cart=new Cart();
    this.user.cart.dateCreated=new Date();
    console.log('this.user='+JSON.stringify(this.user));
    this.dataManagerService.createUser(this.user);
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}
