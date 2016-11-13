import {Component, OnInit} from '@angular/core';
import {AccountService} from "../../services/account.service";
import {LogService} from "../../services/log.service";

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

    constructor(private accountService: AccountService) {
    }

    ngOnInit() {
    }

    onSubmit() {
        this.accountService.sendSupportRequest(this.email, this.type, this.content).subscribe(
            res=> {
                LogService.i(SupportPageComponent.TAG, JSON.stringify(res));

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
