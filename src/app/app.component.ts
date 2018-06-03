import { Component } from '@angular/core';
import * as firebase from 'firebase';
import { environment } from '../environments/environment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  constructor(){
    if(!firebase.apps.length){
      firebase.initializeApp({
        apiKey: environment.firebase.apiKey,
        authDomain: environment.firebase.authDomain,
        databaseURL: environment.firebase.databaseURL,
        projectId: environment.firebase.projectId,
        storageBucket: environment.firebase.storageBucket,
        messagingSenderId: environment.firebase.messagingSenderId
      }); 
    }else{
      firebase.app()
    }
  }

  ngOnInit(): void {
    
  }
}
