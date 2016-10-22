import {Component, OnInit} from "@angular/core";
import {AccountService} from "../../services/account.service";
import {EventService} from "../../services/event.service";
import {UIRouter} from "ui-router-ng2";

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css'],
    providers: [AccountService]
})

export class LoginComponent implements OnInit {
    public email: string;
    public password: string;
    public errors: string[] = [];

    constructor(private account: AccountService,
                private event: EventService,
                private router: UIRouter) {
    }

    ngOnInit() {

    }

    public submit(): void {
        this.account.auth(this.email, this.password)
            .subscribe(
                response => {
                    this.errors = [];
                    this.email = '';
                    this.password = '';

                    let data = response.json();
                    this.event.loginSuccess(data.data);
                    this.router.stateService.go('class');
                },
                error => {
                    console.log(error);
                }
            )
    }
}

export const loginState = {
    name: 'login',
    url: '/login',
    component: LoginComponent
};
