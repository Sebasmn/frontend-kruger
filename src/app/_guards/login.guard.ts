import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { TokenStorageService } from '../_services/token-storage.service';

@Injectable({
  providedIn: 'root'
})
export class LogindGuard implements CanActivate {

  isLoggedIn = false;

  constructor(private tokenStorageService: TokenStorageService, private router:Router){
    this.isLoggedIn = !!this.tokenStorageService.getToken();
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      if (this.isLoggedIn) {
        let roles = this.tokenStorageService.getUser().roles;
        let haveAdminRole = roles.includes('administrador');
        let haveEmployeeRole = roles.includes('empleado');
        if(haveAdminRole){
          return this.router.navigate(['/adminpanel']).then(() => false);
        }else if(haveEmployeeRole){
          return this.router.navigate(['/employeepanel']).then(() => false);
        }

      }
      return true;
  }

}
