import { Component, OnInit } from '@angular/core';
import {MediaMatcher} from '@angular/cdk/layout';
import {ChangeDetectorRef} from '@angular/core';

@Component({
  selector: 'app-admin-app',
  templateUrl: './admin-app.component.html',
  styleUrls: ['./admin-app.component.scss']
})
export class AdminAppComponent implements OnInit {
 
  mobileQuery: MediaQueryList;
       private _mobileQueryListener: () => void;

       constructor(changeDetectorRef: ChangeDetectorRef, media: MediaMatcher) {
    
         this.mobileQuery = media.matchMedia('(max-width: 600px)');
         this._mobileQueryListener = () => changeDetectorRef.detectChanges();
         this.mobileQuery.addListener(this._mobileQueryListener);
       }
       ngOnDestroy(): void {
        this.mobileQuery.removeListener(this._mobileQueryListener);
      }
      
  ngOnInit() {
  }

}

