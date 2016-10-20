import {Injectable, Inject} from "@angular/core";
import {Observable} from "rxjs";
import {Response} from "@angular/http";
import {ApiService} from "../services/api.service";

@Injectable()
export class AccountService {

    constructor(@Inject(ApiService) private api: ApiService) {
    }

    public auth(email: string, password: string): Observable<Response> {
        var data = "email=" + email + "&password=" + password;

        var args = {
            data: data,
            method: 'POST',
            url: '/login'
        };

        return this
            .api.request(args);
    }
}
