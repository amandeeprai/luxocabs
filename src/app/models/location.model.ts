import { APP_CONSTANT } from "../constants/app.constants";

export class LocationModel {
    _id: string;
    name: string;
    readonly type: string = APP_CONSTANT.LOCATION_TYPE;
    isActive: boolean;
    regionId: string;
}