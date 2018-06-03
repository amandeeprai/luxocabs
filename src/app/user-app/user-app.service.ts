import { environment } from '../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { LocalStorageService } from '../localstorage.service';
import { APP_CONSTANT } from '../constants/app.constants';

@Injectable({
  providedIn: 'root'
})
export class UserAppService {

  restOriginURL: string;

  constructor(private http: HttpClient, private localStorageService: LocalStorageService) {
    this.restOriginURL = environment.restOriginURL;
  }

  post(item: any, api:string): Observable<any> {
    // this.httpOptions = {
    //   headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': this.authService.token })
    // };
    return this.http.post<any>(this.restOriginURL + api, item, {});
  }

  securePost(item: any, api:string, token): Observable<any> {
    let httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': token })
    };
    return this.http.post<any>(this.restOriginURL + api, item, httpOptions);
  }

  fetchAll(api:string): Observable<any>{
    // this.httpOptions = {
    //   headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': this.authService.token })
    // };
    return this.http.get(this.restOriginURL + api, {});
  }

  adminFetchAll(api:string): Observable<any>{
    // this.httpOptions = {
    //   headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': this.authService.token })
    // };
    return this.http.get(this.restOriginURL + api, {});
  }

  update(item: any, api:string): Observable<any> {
    // this.httpOptions = {
    //   headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': this.authService.token })
    // };
    return this.http.put<any>(this.restOriginURL + api, item, {});
  }
}
