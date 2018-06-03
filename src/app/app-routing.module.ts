import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  //{ path: '', redirectTo: 'user-app', pathMatch: 'full' },
  { path: '', loadChildren: 'app/user-app/user-app.module#UserAppModule' },
  { path: 'admin-app', loadChildren: 'app/admin-app/admin-app.module#AdminAppModule' },
  { path: 'contact-us', loadChildren: 'app/contact-us/contact-us.module#ContactUsModule' }
];
@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
