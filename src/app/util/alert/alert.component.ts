import { Component, OnInit } from '@angular/core';
import {MatSnackBar} from '@angular/material';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.scss']
})
export class AlertComponent implements OnInit {

  constructor(public snackBar: MatSnackBar) { }

  ngOnInit() {
  }

  successAlert(msg, action){
    console.log('success msgs')
    this.snackBar.open(msg, action, {
      duration: 10000,
    });
  }

  errorAlert(msg, action){
    console.log('error msgs')
    this.snackBar.open(msg, action);
  }

}
