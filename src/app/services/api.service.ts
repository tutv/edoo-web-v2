import {Injectable} from "@angular/core";
import {Http, Headers, Response} from "@angular/http";
import {Observable} from "rxjs";
import {StorageService} from "./storage.service";
import {EventService} from "./event.service";
import {environment} from "../../environments/environment";

@Injectable()
export class ApiService {
    private BASE_URL = '';

    constructor(private http: Http,
                private storage: StorageService,
                private event: EventService) {
        this.BASE_URL = environment.url_api;
    }

    public request(args): Observable<any> {
        let url_api = this.BASE_URL + args.url;

        let headers = new Headers();
        headers.set('Content-Type', 'application/json');

        let source = this
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
            .share();

        if (!args.ignoreLoadingBar) {
            this.loadingBar(source);
        }

        return source;
    }

    public requestAuth(args): Observable<any> {
        let url_api = this.BASE_URL + args.url;

        let headers = new Headers();
        headers.set('Content-Type', 'application/json');
        headers.set('Authorization', this.storage.getToken());

        let source = this
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
                    this.event.authFailed(error.json());

                    return Observable.throw(error);
                }
            )
            .share();

        if (!args.ignoreLoadingBar) {
            this.loadingBar(source);
        }

        return source;
    }

    private loadingBar(source: Observable<Response>) {
        NProgress.start();

        source.subscribe(
            data => {
                NProgress.done();
            },
            error => {
                NProgress.done();
            }
        );
    }
}
