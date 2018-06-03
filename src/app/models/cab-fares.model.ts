import { CabFareModel } from "./cab-fare.model";
import { RideInfoModel } from "./ride-info.model";

export class CabFaresModel {
    rideInfo: RideInfoModel;
    finalFareList: CabFareModel[] = [];
}