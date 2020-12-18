import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable()
export class AuthGuard implements CanActivate{
    constructor(private router: Router){}
    canActivate(
        next: ActivatedRouteSnapshot,
        state: RouterStateSnapshot): boolean {
            if(localStorage.getItem('AccessToken') != null)
            return true;
            this.router.navigate(['/login']);
            return false;
        }
}