import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { DataManagerService } from '../services/data-manager.service';

@Injectable()
export class AdminGuard implements CanActivate{

  constructor(private dataManagerService: DataManagerService,
    private router: Router) { }

    canActivate()
    {
      if(this.dataManagerService.isAdminUser())  
      return true;

      //Returning to previous route
      //private state: RouterStateSnapshot
      //this.router.navigate(['/'],{queryParams:{returnUrl:this.state.url}});
      this.router.navigate(['/']);
      return false;
  }

}
