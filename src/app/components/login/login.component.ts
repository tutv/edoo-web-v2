import {Component, OnInit} from "@angular/core";
import {AccountService} from "../../services/account.service";
import {EventService} from "../../services/event.service";
import {UIRouter} from "ui-router-ng2";
import {NotificationService} from "../../services/notification.service";
import {Title} from "@angular/platform-browser";
import {AuthService} from "../../services/auth.service";

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss'],
    providers: [AccountService]
})

export class LoginComponent implements OnInit {
    public email: string;
    public password: string;
    public errors: string[] = [];

    constructor(private account: AccountService,
                private event: EventService,
                private router: UIRouter,
                private notification: NotificationService,
                private auth: AuthService,
                private titleService: Title) {
        if (this.auth.authenticated()) {
            this.redirect();
        }
    }

    ngOnInit() {
        this.titleService.setTitle('Đăng nhập');
    }

    public submit(): void {
        this.account.auth(this.email, this.password)
            .subscribe(
                response => {
                    this.errors = [];
                    this.event.loginSuccess(response['data']);
                    this.redirect();
                },
                error => {
                    this.resetAll();

                    var body = error.json();
                    this.notification.error(body.message);
                },
                () => {
                    this.resetAll();
                }
            );
    }

    private resetAll() {
        this.email = '';
        this.password = '';
    }

    private redirect() {
        this.router.stateService.go('classes');
    }
}

export const loginState = {
    name: 'login',
    url: '/login',
    component: LoginComponent
};
