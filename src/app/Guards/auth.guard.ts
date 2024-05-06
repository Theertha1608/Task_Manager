import { Injectable } from '@angular/core';
import { CanActivate, Router, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../Services/auth.service';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  // This method determines whether the user can access a particular route
  canActivate(route: any): Observable<boolean | UrlTree> {
    // Check if the user is logged in
    return this.authService.isLoggedIn$.pipe(
      map((isLoggedIn: boolean) => {
        // If the user is logged in, allow access
        if (isLoggedIn) {
          return true;
        } else {
          // If the user is not logged in
          // Redirect to login page if trying to access 'user-profile' route
          // Otherwise, deny access
          if (route.routeConfig.path === 'user-profile') {
            return this.router.parseUrl('/login'); // Redirect to login page
          } else {
            return false; // Deny access
          }
        }
      })
    );
  }
}
