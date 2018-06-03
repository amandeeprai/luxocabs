import { RideInfoModel, GeoLocation } from "./ride-info.model";
import { CabFareModel } from "./cab-fare.model";
import { UserModel } from "./user.model";

export class BookingModel {
    _id: string;

    flagFallFare: Number;
    distanceFare: Number;
    bookingFees: Number;
    premiumServiceCharge: Number;
    pickupFromAirportCharge: Number;
    totalFare: any;
    fareType: string;
    gstOnElectronicPayment: any;
    serviceType: string;
    limit: Number;
    imgURL: string;
    cabName: string;
    serviceFee: Number;

    pickupLatitude: Number;
    pickupLongitude: Number;
    destinationLatitude: Number;
    destinationLongitude: Number;
    pickupAddress: string = null;
    destinationAddress: string = null;
    passengers: Number;
    pickupDate: any;
    pickupTime: string;
    totalDistance: string;

    userId: string;
    uid: string;
    firstName: string;
    lastName: string;
    email: string;
    phoneNumber: string;
    stripeToken: string = null;

    paymentMode: string;
    payStatus: string;
    payAmount: any;
    stripePaymentId: string;
    paymentDoneTime: string;
    balanceTransaction: string;
    stripePaymentCurrenct: string;
    stripeNetworkStatus: string;
    stripeRiskLevel: string;

}