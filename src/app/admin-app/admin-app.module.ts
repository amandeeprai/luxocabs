import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminAppComponent } from './admin-app.component';
import { Routes, RouterModule } from '@angular/router';
import { CoreModule } from './core/core.module';
import { AdminAppService } from './admin-app.service';
import { MatIcon, MatToolbar, MatIconModule, MatToolbarModule, MatSidenavModule,  MatListModule } from '@angular/material';
import { NavbarModule } from '../mdb-components/free';
import { AdminGuard } from './admin-guard.service';

const routes: Routes = [
  {
    path: '', 
    redirectTo: "login"
  },{
    path: 'login', 
    loadChildren: 'app/admin-app/login/login.module#LoginModule'
  },
  { 
    path: 'dashboard', 
    component: AdminAppComponent,
    canActivate: [AdminGuard],
    children: [
      {
        path: 'home', 
        loadChildren: 'app/admin-app/home/home.module#HomeModule'
      },
      {
        path: 'bookings', 
        loadChildren: 'app/admin-app/bookings/bookings.module#BookingsModule'
      },
      {
        path: 'cab-fare', 
        loadChildren: 'app/admin-app/cab-fare/cab-fare.module#CabFareModule'
      },
      {
        path: 'users', 
        loadChildren: 'app/admin-app/users/users.module#UsersModule'
      }
    ]
  }
]


@NgModule({
  imports: [
    CommonModule,
    CoreModule,
    RouterModule.forChild(routes),
    MatIconModule,
    MatToolbarModule,
    MatSidenavModule,
    NavbarModule,
    MatListModule
  ],
  declarations: [AdminAppComponent],
  providers: [AdminGuard, AdminAppService]
})
export class AdminAppModule { }
