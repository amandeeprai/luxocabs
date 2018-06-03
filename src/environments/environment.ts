// This file can be replaced during build by using the `fileReplacements` array.
// `ng build ---prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  firebase: {
    apiKey: "AIzaSyDSmktg0Oi8VqOjUaz9jW9HuS0vYFtZhxY",
    authDomain: "luxo-cabs-01.firebaseapp.com",
    databaseURL: "https://luxo-cabs-01.firebaseio.com",
    projectId: "luxo-cabs-01",
    storageBucket: "luxo-cabs-01.appspot.com",
    messagingSenderId: "883070140168"
  },
  restOriginURL: "http://192.168.43.22:3000",
  restRegionURL: "/rest/api/region/",
  restLocationURL: "/rest/api/location/",
  restFareURL: "/rest/api/fare/admin/",
  restCalculateFareURL: "/rest/api/fare-calculation/",
  restUserRegistration: "/rest/api/user",
  COUNTRY_CODE: "+91",
  restBookingURL: "/rest/api/booking"
};

/*
 * In development mode, to ignore zone related error stack frames such as
 * `zone.run`, `zoneDelegate.invokeTask` for easier debugging, you can
 * import the following file, but please comment it out in production mode
 * because it will have performance impact when throw error
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
