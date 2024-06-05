import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { UserAuthService } from './shared/services/user-auth.service';
import { UserService } from './shared/services/user.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    private userAuthService: UserAuthService,
    private userService: UserService,
    private router: Router
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const allowedRoles = route.data['roles'] as string[];

    if (this.userAuthService.getToken()) {
      const userRoles = this.userAuthService.getRoles();

      if (this.userService.roleMatch(allowedRoles)) {
        return true;
      } else {
        this.router.navigate(['/forbidden']);
        return false;
      }
    }

    this.router.navigate(['/login']);
    return false;
  }
}
