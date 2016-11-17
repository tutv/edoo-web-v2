import {Component, OnInit} from '@angular/core';
import {AccountService} from "../../services/account.service";
import {LogService} from "../../services/log.service";
import {StorageService} from "../../services/storage.service";
import {AuthService} from "../../services/auth.service";
import {NotificationService} from "../../services/notification.service";
import {UtilService} from "../../services/util.service";

@Component({
    selector: 'support-page',
    templateUrl: './support-page.component.html',
    styleUrls: ['./support-page.component.scss']
})
export class SupportPageComponent implements OnInit {
    private static TAG = 'SupportPageComponent';

    private email = '';
    private type = '';
    private content = '';

    constructor(private accountService: AccountService,
                private notiService: NotificationService,
                private storage: StorageService,
                private auth: AuthService,
    private util: UtilService) {
    }

    ngOnInit() {
        this.util.backToTop();
        
        if (this.auth.authenticated()) {
            var user = this.storage.getUserData();
            this.email = user['email'];
        }
    }

    onSubmit() {
        this.accountService.sendSupportRequest(this.email, this.type, this.content).subscribe(
            res=> {
                LogService.i(SupportPageComponent.TAG, JSON.stringify(res));
                this.notiService.success('Yêu cầu của bạn đã được ghi lại, Cám ơn bạn!');

                this.email = '';
                this.type = '';
                this.content = '';
            },
            err=> {
                LogService.i(SupportPageComponent.TAG, 'error');
            }
        )
    }

}

export const supportState = {
    name: 'support',
    url: '/support',
    component: SupportPageComponent
};
