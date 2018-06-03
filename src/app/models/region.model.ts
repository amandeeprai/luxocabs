import { APP_CONSTANT } from '../constants/app.constants';
export class RegionModel{
    _id: string;
    name: string;
    readonly type: string = APP_CONSTANT.REGION_TYPE;
    isActive: boolean;
}