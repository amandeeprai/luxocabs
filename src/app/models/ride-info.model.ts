export class RideInfoModel{
    pickupLocation: GeoLocation = new GeoLocation();
    destinationLocation: GeoLocation = new GeoLocation();
    pickupAddress: string = null;
    destinationAddress: string = null;
    passengers: Number;
    pickupDate: Date;
    pickupTime: string;
    serviceType: string;
    totalDistance: string;
}

export class GeoLocation{
    latitude: number; 
    longitude: number;
}