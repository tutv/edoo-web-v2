import {Component, OnInit} from '@angular/core';
import {EventService} from "../../services/event.service";
import {StorageService} from "../../services/storage.service";

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
    public user: any = null;
    public isLogin = false;

    constructor(private eventService: EventService,
                private storage: StorageService) {


        eventService.login$.subscribe(
            data => {
                this.isLogin = true;
                this.onLoginSuccess(data);
            }
        );
    }

    ngOnInit() {
        var token = this.storage.getToken();
        if (token) {
            this.isLogin = true;
            this.user = this.storage.getUserData();
        }
    }

    public onLoginSuccess(data) {
        this.storage.setUserData(data.user);
        this.storage.setToken(data.token);
        this.user = this.storage.getUserData();
    }
}
