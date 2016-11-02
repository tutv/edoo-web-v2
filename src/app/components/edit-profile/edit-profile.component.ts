import {Component, OnInit, Input} from "@angular/core";
import {AccountService} from "../../services/account.service";
import {Title} from "@angular/platform-browser";

@Component({
    selector: 'app-edit-profile',
    templateUrl: './edit-profile.component.html',
    styleUrls: ['./edit-profile.component.css'],
    providers: [AccountService]
})
export class EditProfileComponent implements OnInit {
    @Input() user = {};

    constructor(private account: AccountService,
                private titleService: Title) {
    }

    ngOnInit() {
        this.titleService.setTitle('Cập nhật thông tin cá nhân');
    }

    openEdit(param) {
        console.log('edit' + param);
    }
}


export const editProfileState = {
    name: 'settings.profile',
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
