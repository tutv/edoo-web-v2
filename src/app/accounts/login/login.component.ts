import {Component, OnInit} from "@angular/core";
import {AccountService} from "../account.service";
import {StorageService} from "../../services/storage.service";

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
                private storage: StorageService) {
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
                    let token = data.data.token;
                    this.storage.setToken(token);

                    let user = data.data.user;
                    this.storage.setUserData(user);
                },
                error => {
                    console.log(error);
                }
            )
    }

}
