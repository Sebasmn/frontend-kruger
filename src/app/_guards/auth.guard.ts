import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { TokenStorageService } from '../_services/token-storage.service';


@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  isLoggedIn = false;

  constructor(private tokenStorageService: TokenStorageService, private router:Router){
    this.isLoggedIn = !!this.tokenStorageService.getToken();
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      if (!this.isLoggedIn) {
        return this.router.navigate(['/login']).then(() => false);
      }
      return true;
  }

}
