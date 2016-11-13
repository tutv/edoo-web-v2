import {Injectable} from '@angular/core';
import {Subject} from "rxjs";

@Injectable()
export class EventService {
    private onLogin = new Subject<any>();
    private onAuth = new Subject<any>();
    private onFetchListClasses = new Subject<any>();

    public login$ = this.onLogin.asObservable();
    public auth$ = this.onAuth.asObservable();
    public listClass$ = this.onFetchListClasses.asObservable();

    constructor() {
    }

    loginSuccess(data: any) {
        this.onLogin.next(data);
    }

    authFailed(error: any) {
        if (error.statusCode == 401) {
            this.onAuth.next(error);
        }
    }

    fetchListClasses(classes: any) {
        this.onFetchListClasses.next(classes);
    }
}
