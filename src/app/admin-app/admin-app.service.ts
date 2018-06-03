import { environment } from '../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, from } from 'rxjs';
import { LocalStorageService } from '../localstorage.service';
import { APP_CONSTANT } from '../constants/app.constants';
import * as firebase from 'firebase';

@Injectable({
  providedIn: 'root'
})
export class AdminAppService {

  restOriginURL: string;

  constructor(private http: HttpClient, private localStorageService: LocalStorageService) {
    this.restOriginURL = environment.restOriginURL;
  }

  create(item: any, api:string, token): Observable<any> {
    let httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': token })
    };
    return this.http.post<any>(this.restOriginURL + api, item, httpOptions);
  }

  fetchAll(api:string, token): Observable<any>{
    let httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': token })
    };
    return this.http.get(this.restOriginURL + api, httpOptions);
  }

  adminFetchAll(api:string, token): Observable<any>{
    let httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': token })
    };
    return this.http.get(this.restOriginURL + api, httpOptions);
  }

  update(item: any, api:string, token): Observable<any> {
    console.log("update caled")
    let httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': token })
    };
    return this.http.put<any>(this.restOriginURL + api, item, httpOptions);
  }

  // update(item: any, api:string): Observable<any> {
  //   console.log("update caled")
  //   return from(firebase.auth().currentUser.getIdToken()).map(
  //   token=>{
  //     let httpOptions = {
  //       headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': token })
  //     };
  //     return this.http.put<any>(this.restOriginURL + api, item, httpOptions);
  //   })
  // }
}
