import {Injectable} from '@angular/core';
import {StorageService} from "./storage.service";

@Injectable()
export class AuthService {

    constructor(private storageService: StorageService) {

    }

    authenticated() {
        let token = this.storageService.getToken();

        return Boolean(token);
    }

}
