import { auth } from 'firebase-admin';

export default class UserService {

    async findByUid(uid: string) {
       return await auth().getUser(uid);
    }
}