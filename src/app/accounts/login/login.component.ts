import {Component, OnInit, Inject} from '@angular/core';
import {AccountService} from "../account.service";
import {ApiService} from "../../services/api.service";

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css'],
    providers: [AccountService, ApiService]
})
export class LoginComponent implements OnInit {
    public email: string;
    public password: string;

    constructor(private account: AccountService) {
    }

    ngOnInit() {

    }

    public submit(): void {
        this.account.auth(this.email, this.password)
            .subscribe(
                response => {
                    var data = response.json();
                    console.log(data);
                },

                error => {
                    console.log(error);
                }
            )
    }

}
