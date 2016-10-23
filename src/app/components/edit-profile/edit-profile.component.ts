import {Component, OnInit, Input} from '@angular/core';
import {AccountService} from "../../services/account.service";

@Component({
    selector: 'app-edit-profile',
    templateUrl: './edit-profile.component.html',
    styleUrls: ['./edit-profile.component.css'],
    providers: [AccountService]
})
export class EditProfileComponent implements OnInit {
    @Input() user = {};

    constructor(
        private account: AccountService
    ) {
    }

    ngOnInit() {
    }

    openEdit(favorite){

    }
}


export const editProfileState = {
    name: 'profile',
    url: '/profile',
    component: EditProfileComponent,
    resolve: [
        {
            token: 'user',
            deps: [AccountService],
            resolveFn: (account) => account.getProfile()
        }
    ]
};
