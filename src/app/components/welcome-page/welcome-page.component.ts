import {Component, OnInit} from "@angular/core";
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
        if (this.authService.authenticated()) {
            this.router.stateService.go('classes');
        }
    }

    onJoinBtnClick() {
        if (this.authService.authenticated()) {
            this.router.stateService.go('classes');
        } else this.router.stateService.go('login');
        }
    }

}
