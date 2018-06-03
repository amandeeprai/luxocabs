import { Injectable, PLATFORM_ID, Inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Injectable()
export class LocalStorageService{
    
    constructor(
        @Inject(PLATFORM_ID) private platformId: any,
        @Inject('LOCALSTORAGE') private localStorage: any
    ) {}

    get(key) {
        if (isPlatformBrowser(this.platformId)) {
            return this.localStorage.getItem(key);
        }
    }

    set(key, value) {
        if (isPlatformBrowser(this.platformId)) {
            this.localStorage.setItem(key, value);
        }
    }

    remove(key) {
        if (isPlatformBrowser(this.platformId)) {
            this.localStorage.removeItem(key);
        }
    }

    clear() {
        if (isPlatformBrowser(this.platformId)) {
            this.localStorage.clear();
        }
    }

}