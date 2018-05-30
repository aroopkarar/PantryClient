import { Product, User } from './modal/Modals';
import { DataManagerService } from './services/data-manager.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(private service: DataManagerService)
  {

  }

  isValidUser()
  {
    return this.service.isValidUser();
  }
}
