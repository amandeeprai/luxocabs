import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserAppComponent } from './user-app.component';
import { Routes } from '@angular/router';
import { CoreModule } from './core/core.module';
import { LoginModule } from './dashboard/login/login.module';
import { RegistrationModule } from './dashboard/registration/registration.module';
import { UserAppService } from './user-app.service';
import { MatProgressSpinnerModule } from '@angular/material';
import { LoaderComponent } from './../loader/loader.component';
const routes: Routes = [
  
    { 
    path: '', 
    component: UserAppComponent,
    children: [
      {
        path: '', 
        loadChildren: 'app/user-app/dashboard/home/home.module#HomeModule'
      },
      {
        path: 'booking', 
        loadChildren: 'app/user-app/dashboard/pre-booking/pre-booking.module#PreBookingModule'
      },
      {
        path: 'services', 
        loadChildren: 'app/user-app/dashboard/services/services.module#ServicesModule'
      },
      {
        path: 'contact-us', 
        loadChildren: 'app/contact-us/contact-us.module#ContactUsModule'
      },
      {
        path: 'limo-services', 
        loadChildren: 'app/user-app/dashboard/limo-service/limo-service.module#LimoServiceModule'
      },
      {
        path: 'fleets', 
        loadChildren: 'app/user-app/dashboard/fleets/fleets.module#FleetsModule'
      },
      {
        path: 'about-us', 
        loadChildren: 'app/about-us/about-us.module#AboutUsModule'
      },
      {
        path: 'airport-pickups', 
        loadChildren: 'app/user-app/dashboard/airport-pickups/airport-pickups.module#AirportPickupsModule'
      },
      {
        path: 'fqa', 
        loadChildren: 'app/user-app/dashboard/fqa/fqa.module#FqaModule'
      }
    ]
  }
]

@NgModule({
  imports: [
  MatProgressSpinnerModule,
  CommonModule,
    CoreModule,
    RouterModule.forChild(routes),
    LoginModule,
    RegistrationModule,

  ],
  declarations: [UserAppComponent],
  providers: [UserAppService]
})
export class UserAppModule { }
