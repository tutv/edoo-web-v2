import {Injectable} from "@angular/core";
import {Http, Headers, Response} from "@angular/http";
import {Observable} from "rxjs";
import {StorageService} from "./storage.service";
import {EventService} from "./event.service";

@Injectable()
export class ApiService {
    private BASE_URL = 'http://api-v2.uetf.me';

    constructor(private http: Http,
                private storage: StorageService,
                private event: EventService) {
    }

    public request(args): Observable<Response> {
        var url_api = this.BASE_URL + args.url;

        var headers = new Headers();
        headers.set('Content-Type', 'application/json');

        return this
            .http
            .request(url_api, {
                method: args.method,
                headers: headers,
                body: args.data
            })
            .map(response => {
                    return response.json();
                }
            );
    }

    public requestAuth(args): Observable<Response> {
        var url_api = this.BASE_URL + args.url;

        var headers = new Headers();
        headers.set('Content-Type', 'application/json');
        headers.set('Authorization', this.storage.getToken());

        return this
            .http
            .request(url_api, {
                method: args.method,
                headers: headers,
                body: args.data
            })
            .map(response => {
                    return response.json();
                }
            )
            .catch(
                error => {
                    this.event.authFailed(error);

                    return Observable.throw(error);
                }
            );
    }
}
