import { Component, OnInit, ViewChild } from '@angular/core';
import { AdminAppService } from '../admin-app.service';
import { environment } from '../../../environments/environment';
import { BookingModel } from '../../models/booking.model';
import { from } from 'rxjs';
import * as firebase from 'firebase';
import { MatTableDataSource, MatPaginator } from '@angular/material';
import { FareModel } from '../../models/fare.model';

@Component({
  selector: 'app-bookings',
  templateUrl: './bookings.component.html',
  styleUrls: ['./bookings.component.scss']
})
export class BookingsComponent implements OnInit {
  displayedColumns = ['_id', 'pickupAddress', 'pickupDate', 'stripeToken',  'operation'];
  
  dataSource: MatTableDataSource<FareModel>;
  
  @ViewChild(MatPaginator) paginator: MatPaginator;
  
  constructor(private adminAppService: AdminAppService) { }

  ngOnInit() {
    setTimeout(() => {
      this.fetchAllBookings();
    }, 1000);
  }

  fetchAllBookings(){
    from(firebase.auth().currentUser.getIdToken()).subscribe(
      token=>{
        this.adminAppService.fetchAll(`${environment.restBookingURL}/admin/`, token).subscribe(
          data => {
            console.log("get all bookings ", data )
            this.dataSource = new MatTableDataSource<FareModel>(data);
              this.dataSource.paginator = this.paginator;
          },
          error => {
            console.log(error)
          }
        )
      },
      error =>{
        console.log("Error while fetching token")
      }
    )
  }
}
