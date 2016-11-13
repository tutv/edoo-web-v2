import {Component, OnInit} from "@angular/core";
import {EventService} from "../../services/event.service";
import {StorageService} from "../../services/storage.service";
import {UIRouter} from "ui-router-ng2";
import {AccountService} from "../../services/account.service";
import {NotificationService} from "../../services/notification.service";
import {ClassService} from "../../services/class.service";
import {AuthService} from "../../services/auth.service";

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss'],
    providers: [AccountService, ClassService]
})
export class HeaderComponent implements OnInit {
    public user: any = null;
    public isLogin = false;
    public classes = [];

    constructor(private classService: ClassService,
                private event: EventService,
                private storage: StorageService,
                private accountService: AccountService,
                private router: UIRouter,
                private notification: NotificationService,
                private auth: AuthService) {
        this.event.login$.subscribe(
            data => {
                this.isLogin = true;
                this.onLoginSuccess(data);
            }
        );

        this.event.auth$.subscribe(
            data => {
                this.notification.error('Phiên làm việc của bạn đã hết hạn. Vui lòng đăng nhập lại!');
                this.reLogin();
            }
        );

        this.event.listClass$
            .subscribe(
                data => {
                    this.onFetchListClasses(data);
                }
            )
    }

    private onFetchListClasses(classes) {
        this.storage.setListClasses(classes);//cache data
        this.classes = classes;
    }

    private fetchListClasses() {
        this.classService
            .getListClasses()
            .then(
                data => {
                    this.event.fetchListClasses(data);
                },
                error => {

                }
            );
    }

    private reLogin() {
        this.isLogin = false;
        this.storage.removeAll();
        this.router.stateService.go('login');
    }

    ngOnInit() {
        if (this.auth.authenticated()) {
            this.isLogin = true;
            this.user = this.storage.getUserData();

            var listClasses = this.storage.getListClasses();
            if (!listClasses) {
                this.fetchListClasses();
            } else {
                this.event.fetchListClasses(listClasses);
            }
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
