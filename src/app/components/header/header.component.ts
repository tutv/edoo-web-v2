import {Component, OnInit} from "@angular/core";
import {EventService} from "../../services/event.service";
import {StorageService} from "../../services/storage.service";
import {UIRouter} from "ui-router-ng2";
import {AccountService} from "../../services/account.service";
import {NotificationService} from "../../services/notification.service";

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.css'],
    providers: [AccountService]
})
export class HeaderComponent implements OnInit {
    public user: any = null;
    public isLogin = false;

    constructor(private eventService: EventService,
                private storage: StorageService,
                private accountService: AccountService,
                private router: UIRouter,
                private notification: NotificationService) {
        this.eventService.login$.subscribe(
            data => {
                this.isLogin = true;
                this.onLoginSuccess(data);
            }
        );

        this.eventService.auth$.subscribe(
            data => {
                this.notification.error('Phiên làm việc của bạn đã hết hạn. Vui lòng đăng nhập lại!');
                this.reLogin();
            }
        )
    }

    reLogin() {
        this.isLogin = false;
        this.storage.removeAll();
        this.router.stateService.go('login');
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

    public logOut() {
        this.accountService
            .logOut()
            .subscribe(
                response => {
                },
                error => {
                    this.isLogin = false;
                    this.storage.removeAll();
                    this.router.stateService.go('welcome');
                },
                () => {
                    this.isLogin = false;
                    this.storage.removeAll();
                    this.router.stateService.go('welcome');
                }
            );
    }
}
