import { UserDetails } from "../infra/types/user-details.type";

declare global {
    namespace Express {
        interface Request {
            user: UserDetails;
        }
    }
}