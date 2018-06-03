export class UserModel{
    _id: string;
    uid: string;
    roles: string[];
    firstName: string;
    lastName: string;
    email: string;
    phoneNumber: string;
    isUserVerified: boolean;
}