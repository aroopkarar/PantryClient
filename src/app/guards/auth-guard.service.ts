import { DataManagerService } from './../services/data-manager.service';
import { Injectable } from '@angular/core';
import { Router, CanActivate, RouterStateSnapshot } from '@angular/router';

@Injectable()
export class AuthGuard implements CanActivate{

  constructor(private dataManagerService: DataManagerService,
    private router: Router) { }

  canActivate()
  {
      if(this.dataManagerService.isValidUser())  
      return true;

      //Returning to previous route
      //private state: RouterStateSnapshot
      //this.router.navigate(['/'],{queryParams:{returnUrl:this.state.url}});
      this.router.navigate(['/']);
      return false;
  }

}
