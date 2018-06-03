import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { NavbarModule } from '../../mdb-components/free/index';
import { SidenavModule, SqueezeBoxModule } from '../../mdb-components/pro/index';
import { RouterModule } from '@angular/router';
import { LoaderModule } from './../../loader/loader.module';
import { MatProgressSpinnerModule } from '@angular/material';
@NgModule({
  imports: [
    CommonModule,
    NavbarModule,
    SidenavModule,
    SqueezeBoxModule,
    RouterModule,
    MatProgressSpinnerModule,
    LoaderModule
  ],
  declarations: [HeaderComponent, FooterComponent],
  exports: [HeaderComponent, FooterComponent]
})
export class CoreModule { }
