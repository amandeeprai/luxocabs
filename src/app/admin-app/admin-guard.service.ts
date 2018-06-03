import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LocalStorageService } from '../localstorage.service';
import { APP_CONSTANT } from '../constants/app.constants';
import { UserModel } from '../models/user.model';


@Injectable({
    providedIn: 'root'
  })
export class AdminGuard implements CanActivate {

    constructor(private router: Router, private localStorageService: LocalStorageService) { }
  
    public canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean { 
        
        let data = this.localStorageService.get(APP_CONSTANT.LOCALSTORAGE_USERINFO_KEY);
        let userInfo: UserModel = data == null ? new UserModel() : JSON.parse(atob(data));
        
        if(!userInfo._id){
            //route to login page
            this.router.navigate(['/admin-app']);
            return false;
        }

        if(userInfo.roles.indexOf("ROLE_ADMIN") == -1){
            //route to login page
            this.router.navigate(['/admin-app']);
            return false;
        }
        
        return true;
    }
}