import {Injectable} from "@angular/core";
import {Observable} from "rxjs";
import {Response} from "@angular/http";
import {ApiService} from "./api.service";

@Injectable()
export class AccountService {

    constructor(private api: ApiService) {
    }

    public auth(email: string, password: string): Observable<Response> {
        var data = {
            email: email,
            password: password
        };

        var args = {
            data: data,
            method: 'POST',
            url: '/login'
        };

        return this
            .api.request(args);
    }

    public logOut(): Observable<Response> {
        var args = {
            method: 'GET',
            url: '/logout'
        };

        return this.api
            .requestAuth(args);
    }

    public getProfile() {
        var args = {
            method: 'GET',
            url: '/profile'
        };

        return this.api
            .requestAuth(args)
            .map(response => {
                return response['data'];
            })
            .toPromise();
    }

    public changePassword(old_pass, new_pass) {
        var data = {
            old_password: old_pass,
            new_password: new_pass
        };

        var args = {
            data: data,
            method: 'POST',
            url: '/changepass'
        };

        return this.api
            .requestAuth(args)
            .map(response => {
                return response['data'];
            });
    }
}
