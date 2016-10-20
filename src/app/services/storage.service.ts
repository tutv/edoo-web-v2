import {Injectable} from "@angular/core";
import {CookieService} from "angular2-cookie/services/cookies.service";

@Injectable()
export class StorageService {

    constructor(private storage: CookieService) {
    }

    setToken(token) {
        this.storage.put('user_token', token);
    }

    setUserData(user) {
        this.storage.putObject('user_data', user);
    }

    getUserData(): Object {
        return this.storage.getObject('user_data');
    }

    getToken(): string {
        return this.storage.get('user_token');
    }

    removeAll(): void {
        this.storage.removeAll();
    }
}
