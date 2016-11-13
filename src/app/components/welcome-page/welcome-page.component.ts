import {Component, OnInit} from "@angular/core";
import {LogService} from "../../services/log.service";
import {AuthService} from "../../services/auth.service";
import {UIRouter} from "ui-router-ng2";

@Component({
    selector: 'app-welcome-page',
    templateUrl: './welcome-page.component.html',
    styleUrls: ['./welcome-page.component.scss']
})
export class WelcomePageComponent implements OnInit {
    private static TAG = 'WelcomePageComponent';

    constructor(private authService: AuthService,
                private router: UIRouter) {
    }

    ngOnInit() {
    }

    onJoinBtnClick() {
        if (this.authService.authenticated()) {
            this.router.stateService.go('classes');
        } else {
            this.router.stateService.go('login');
        }
    }

}
