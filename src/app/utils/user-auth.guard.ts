import { Injectable } from "@angular/core";
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from "@angular/router";
import { Observable } from "rxjs";
import { ApplicationStatus, AuthenticationService } from "../services/authentication.service";

@Injectable({
  providedIn: "root",
})
export class UserAuthGuard implements CanActivate {
  constructor(private authService: AuthenticationService, private router: Router) {}
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if (this.authService.applicationStatus === ApplicationStatus.AUTHENTICATED) {
      return true;
    } else {
      return this.router.parseUrl("/login");
    }
  }
}
