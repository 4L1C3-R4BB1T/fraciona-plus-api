import { Request } from "express";
import { UserDetails } from "../infra/types/user-details.type";

export class AuthUtil {

    static getLoggedUser(request: Request, property?: keyof UserDetails) {
        const user = request['user'];
        if (!user) {
            throw new Error('User is not logged in');
        }
        return property ? user[property] : user;
    }
}