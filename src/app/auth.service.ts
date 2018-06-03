import { UserModel } from './models/user.model';
import { EventEmitter, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../environments/environment';
import { Observable } from 'rxjs';
import { LocalStorageService } from './localstorage.service';
import { APP_CONSTANT } from './constants/app.constants';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  restOriginURL: string;

  userLoggedInEvent: EventEmitter<any> = new EventEmitter();

  constructor(private httpClient : HttpClient, private localStorageService: LocalStorageService) {
    this.restOriginURL = environment.restOriginURL;
  }

  registerUser(userInfo: UserModel): Observable<any>{
    return this.httpClient.post(this.restOriginURL + environment.restUserRegistration, userInfo, {})
  }

  verifyPhoneNumber(number: string): Observable<any>{
    return this.httpClient.get(this.restOriginURL + environment.restUserRegistration + '/verify/'+number, {})
  }

  getUserByPhoneNumber(number: string): Observable<any>{
    let httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': this.localStorageService.get(APP_CONSTANT.LOCALSTORAGE_TOKEN_KEY) })
    };
    return this.httpClient.get(this.restOriginURL + environment.restUserRegistration + '/secured/fetch-user-by/'+number, httpOptions)
  }

}
