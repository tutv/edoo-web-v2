import {Injectable} from '@angular/core';
import {Subject} from "rxjs";

@Injectable()
export class EventService {
    private onLogin = new Subject<any>();
    private onAuth = new Subject<any>();

    public login$ = this.onLogin.asObservable();
    public auth$ = this.onAuth.asObservable();

    constructor() {
    }

    loginSuccess(data: any) {
        this.onLogin.next(data);
    }

    authFailed(error: any) {
        this.onAuth.next(error);
    }
}
