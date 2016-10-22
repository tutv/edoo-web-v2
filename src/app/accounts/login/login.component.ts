import {Component, OnInit, Output, EventEmitter} from "@angular/core";
import {AccountService} from "../account.service";
import {StorageService} from "../../services/storage.service";
import {EventService} from "../../services/event.service";

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
                private event: EventService) {
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
                },
                error => {
                    console.log(error);
                }
            )
    }

}
