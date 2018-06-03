import { LocalStorageService } from './localstorage.service';
import { NgModule }       from '@angular/core';
import { BrowserModule }  from '@angular/platform-browser';
import { FormsModule }    from '@angular/forms';
import { HttpClientModule }    from '@angular/common/http';
import { AppRoutingModule }     from './app-routing.module';
import { AppComponent }         from './app.component';
import { PLATFORM_ID, APP_ID, Inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { OverlayModule } from '@angular/cdk/overlay';
import { MatTableModule, MatPaginatorModule, MatSortModule, MatNativeDateModule } from '@angular/material';
import { AuthService } from './auth.service';

@NgModule({
  imports: [
    BrowserModule.withServerTransition({ appId: 'tour-of-heroes' }),
    FormsModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatNativeDateModule
    //OverlayModule
  ],
  declarations: [
    AppComponent
  ],
  providers: [AuthService, LocalStorageService, { provide: 'LOCALSTORAGE', useFactory: getLocalStorage } ],
  bootstrap: [ AppComponent ]
})

export class AppModule {
  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    @Inject(APP_ID) private appId: string) {
    const platform = isPlatformBrowser(platformId) ?
      'in the browser' : 'on the server';
    console.log(`Running ${platform} with appId=${appId}`);
  }
}

export function getLocalStorage() {
  return (typeof window !== "undefined") ? window.localStorage : null;
}
