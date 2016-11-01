import {Component, OnInit} from '@angular/core';
import {NotificationService} from "../../services/notification.service";

@Component({
    selector: 'change-password',
    templateUrl: './change-password.component.html',
    styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {
    public old_pass: string;
    public new_pass: string;
    public confirm_pass: string;

    constructor(private notification: NotificationService) {
    }

    ngOnInit() {
    }

    public submit() {
        var valid = this.validate();

        if (!valid) {
            return;
        }

        this.update();
    }

    public update() {

    }

    public validate() {
        if (this.new_pass !== this.confirm_pass) {
            this.notification.error('Mật khẩu không khớp! Vui lòng thử lại');
            this.reset_all();
            return false;
        }

        return true;
    }

    public reset_all() {
        this.old_pass = '';
        this.new_pass = '';
        this.confirm_pass = '';
    }
}

export const changePasswordState = {
    name: 'settings.changePassword',
    url: '/change-password',
    component: ChangePasswordComponent,
};
