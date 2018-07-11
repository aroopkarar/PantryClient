import { Component, OnInit } from '@angular/core';

import { Product, User } from './../modal/Modals';
import { DataManagerService } from '../services/data-manager.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {


  ngOnInit() {
  }

  constructor(private service: DataManagerService )
  {

  }
  login(formdata)
  {
    console.log(JSON.stringify(formdata.value));
    let user = new User();
    user.username=formdata.value.userid;
    user.password=formdata.value.password;
    console.log(JSON.stringify(user));
      this.service.loginUser(user).subscribe((res)=>{

        let user: User = res.body;
	      console.log('User: '+user);
	      console.log('Headers: '+res.headers.get('Authorization'));	
        console.log('response= '+JSON.stringify(res));

      localStorage.setItem('JWT',res.headers.get('Authorization'));
      if(res.status == 200)
      {
        console.log('res.status= '+res.status);
        this.service.isValid = true;
      }
      else
      {
        this.service.isValid = false;
      }
  });
  }
}
