import { Component, ElementRef, EventEmitter, OnInit, Output, ViewChild, Input } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { APP_CONSTANT } from '../../../../constants/app.constants';
import { RideInfoModel } from '../../../../models/ride-info.model';
import { AlertComponent } from '../../../../util/alert/alert.component';
import * as moment from 'moment'

declare var google:any;

@Component({
  selector: 'app-ride-info-form',
  templateUrl: './ride-info-form.component.html',
  styleUrls: ['./ride-info-form.component.scss']
})
export class RideInfoFormComponent implements OnInit {
  @ViewChild(AlertComponent) alert: AlertComponent;
  isSame: boolean = false;
  @Input("rideInfoForm") rideInfoForm: FormGroup;
  //Google Map starts
  map:any;
  originPlaceId = null;
  destinationPlaceId = null;
  travelMode = 'WALKING';

  minDate = new Date();

  directionsService: any;
  directionsDisplay: any;

  @ViewChild('originInput') originInput: ElementRef;
  @ViewChild('destinationInput') destinationInput: ElementRef;
  @ViewChild('distanceMap') distanceMap: ElementRef;
  ////Google Map ends

  numberOfPassengers = [1,2,3,4,5,6,7,8,9,10];
  serviceTypes = [APP_CONSTANT.FROM_AIRPORT, APP_CONSTANT.TO_AIRPORT, APP_CONSTANT.POINT_TO_POINT];

  rideInfo: RideInfoModel = new RideInfoModel();

  isFromAirport: boolean = false;
  isToAirport: boolean = false;

  @Output("checkFareEvent") checkFareEvent: EventEmitter<any> = new EventEmitter();

  constructor() { 
  }
    
  ngOnInit() {
    this.rideInfoForm = new FormGroup({
      pickupLocation: new FormControl(null, [Validators.required]),
      destinationLocation: new FormControl(null, [Validators.required]),
      passengers: new FormControl(null, [Validators.required]),
      pickupDate: new FormControl(new Date(), [Validators.required]),
      pickupTime: new FormControl(null , [Validators.required]),
      serviceType: new FormControl({value: null, disabled: true}, [Validators.required])
    })
    
    setTimeout(
      ()=>{
        this.initMap();
      }, 1000
    )
}

 //Google Map starts
initMap() {
  let tempMap = this.distanceMap.nativeElement as HTMLInputElement;
  this.map = new google.maps.Map(tempMap, {
    mapTypeControl: false,
    center: {lat: -33.8688, lng: 151.2195},
    zoom: 13
  });
  this.AutocompleteDirectionsHandler(this.map);
}

/**
  * @constructor
*/
AutocompleteDirectionsHandler(map) {
  this.map = map;
  this.originPlaceId = null;
  this.destinationPlaceId = null;
  this.travelMode = 'DRIVING';
  this.directionsService = new google.maps.DirectionsService;
  this.directionsDisplay = new google.maps.DirectionsRenderer;
  this.directionsDisplay.setMap(map);
  let tempOriginInput = this.originInput.nativeElement as HTMLInputElement;
  let tempDestinationInput = this.destinationInput.nativeElement as HTMLInputElement;

  var originAutocomplete = new google.maps.places.Autocomplete(
    tempOriginInput, {types: ['geocode']});
  var destinationAutocomplete = new google.maps.places.Autocomplete(
    tempDestinationInput, {types: ['geocode']});

  originAutocomplete.setComponentRestrictions(
      {'country': ['au']}
  );

  destinationAutocomplete.setComponentRestrictions(
    {'country': ['au']}
  );

  this.setupPlaceChangedListener(originAutocomplete, 'ORIG');
  this.setupPlaceChangedListener(destinationAutocomplete, 'DEST');
}

setupPlaceChangedListener(autocomplete, mode) {
  var _self = this;
  autocomplete.bindTo('bounds', this.map);
  autocomplete.addListener('place_changed', function() {
    var place = autocomplete.getPlace();
    if (!place.place_id) {
      _self.alert.errorAlert("Please select an option from the dropdown list.", "ERROR")
      return;
    }
    if (mode === 'ORIG') {
      console.log(JSON.stringify(place))
      _self.checkServiceTypeForPickup(place);
      _self.originPlaceId = place.place_id;
      _self.rideInfo.pickupAddress = place.formatted_address;
      _self.rideInfo.pickupLocation.latitude = place.geometry.location.lat();
      _self.rideInfo.pickupLocation.longitude = place.geometry.location.lng();
    } else {
      //_self.setServiceType(place);
      _self.checkServiceTypeForDrop(place);      
      _self.destinationPlaceId = place.place_id;
      _self.rideInfo.destinationAddress = place.formatted_address;
      _self.rideInfo.destinationLocation.latitude = place.geometry.location.lat();
      _self.rideInfo.destinationLocation.longitude = place.geometry.location.lng();
    }
    _self.route();
  });

};

route() {
  if (!this.originPlaceId || !this.destinationPlaceId) {
    return;
  }
  var _self = this;

  this.directionsService.route({
    origin: {'placeId': this.originPlaceId},
    destination: {'placeId': this.destinationPlaceId},
    travelMode: this.travelMode
  }, function(response, status) {
    if (status === 'OK') {
      _self.directionsDisplay.setDirections(response);
      //console.log("response is ", JSON.stringify(response))
      var route = response.routes[0];
      _self.rideInfo.totalDistance = route.legs[0].distance.text;
    } else {

      _self.alert.errorAlert('Directions request failed due to ' + status, "ERROR");
    }
  });
};
//Google Map ends
//Ride Info Form Starts
  searchCabs(){
    this.rideInfo.passengers = this.rideInfoForm.value.passengers;
    this.rideInfo.pickupDate = this.rideInfoForm.value.pickupDate
    this.rideInfo.pickupTime = this.rideInfoForm.value.pickupTime
    this.rideInfo.serviceType = this.rideInfoForm.value.serviceType
    if(!this.validatePickupDateAndTime(this.rideInfo.pickupDate, this.rideInfo.pickupTime)){
      return false;
    }
    console.log("Pickup Date and Time is validated")
   this.checkFareEvent.emit(this.rideInfo);
  }

  validatePickupDateAndTime(pickupDate, pickupTime){
    if(!moment().isSameOrBefore(moment(pickupDate), 'day')){
      this.alert.errorAlert('Please select correct pickup date', 'ERROR');
      return false;
    }
    let tempPickupTime = moment(moment(pickupDate).format("YYYY-MM-DD") + " " + pickupTime, "YYYY-MM-DD HH:mm")

    if(moment().isAfter(tempPickupTime)){
      this.alert.errorAlert('Please select correct pickup time', 'ERROR');
      return false;
    }
    return true;
  }

  checkServiceTypeForPickup(place){
    console.log("place.name ", place.name)
    let internationalAirport = "international terminal";
    let airport = "airport";
    let domesticTerminal = "domestic terminal"
    if(place.name.toLowerCase().indexOf(internationalAirport) > -1){
      //It is airport
      this.rideInfoForm.controls['serviceType'].setValue(APP_CONSTANT.FROM_AIRPORT, { onlySelf: true });
      this.isFromAirport = true;
      return;
    }
    if(place.name.toLowerCase().indexOf(airport) > -1){
      //It is airport
      this.rideInfoForm.controls['serviceType'].setValue(APP_CONSTANT.FROM_AIRPORT, { onlySelf: true });
      this.isFromAirport = true;
      return;
    }
    if(place.name.toLowerCase().indexOf(domesticTerminal) > -1){
      //It is airport
      this.rideInfoForm.controls['serviceType'].setValue(APP_CONSTANT.FROM_AIRPORT, { onlySelf: true });
      this.isFromAirport = true;
      return;
    }
    if(!this.isToAirport && !this.isFromAirport){
      this.rideInfoForm.controls['serviceType'].setValue(APP_CONSTANT.POINT_TO_POINT, { onlySelf: true });
    }
    if(this.isToAirport){
      this.isFromAirport = false;
      console.log(" APP_CONSTANT.TO_AIRPORT ", APP_CONSTANT.TO_AIRPORT)
      this.rideInfoForm.controls['serviceType'].setValue(APP_CONSTANT.TO_AIRPORT, { onlySelf: true });
    }
  }

  checkServiceTypeForDrop(place){
    console.log("place.name ", place.name)
    let internationalAirport = "international terminal";
    let airport = "airport";
    let domesticTerminal = "domestic terminal"
    if(place.name.toLowerCase().indexOf(internationalAirport) > -1){
      //It is airport
      if(!this.isFromAirport){
        this.rideInfoForm.controls['serviceType'].setValue(APP_CONSTANT.TO_AIRPORT, { onlySelf: true });
        return;
      }
      
      this.isToAirport = true;
      return;
    }
    if(place.name.toLowerCase().indexOf(airport) > -1){
      //It is airport
      if(!this.isFromAirport){
        this.rideInfoForm.controls['serviceType'].setValue(APP_CONSTANT.TO_AIRPORT, { onlySelf: true });
        return;
      }
      this.isToAirport = true;
      return;
    }

    if(place.name.toLowerCase().indexOf(domesticTerminal) > -1){
      //It is airport
      if(!this.isFromAirport){
        this.rideInfoForm.controls['serviceType'].setValue(APP_CONSTANT.TO_AIRPORT, { onlySelf: true });
        return;
      }
      this.isToAirport = true;
      return;
    }

    this.isToAirport = false;

    if(!this.isToAirport && !this.isFromAirport){
      this.rideInfoForm.controls['serviceType'].setValue(APP_CONSTANT.POINT_TO_POINT, { onlySelf: true });
    }
  }
}
