import {Injectable} from '@angular/core';
import {Subject} from "rxjs";

@Injectable()
export class EventService {
    private onLogin = new Subject<any>();

    public login$ = this.onLogin.asObservable();

    constructor() {
    }

    loginSuccess(data: any) {
        this.onLogin.next(data);
    }

}
