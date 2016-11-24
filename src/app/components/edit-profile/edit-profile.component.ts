import {Component, OnInit, Input} from "@angular/core";
import {AccountService} from "../../services/account.service";
import {Title} from "@angular/platform-browser";
import {NotificationService} from "../../services/notification.service";

@Component({
    selector: 'app-edit-profile',
    templateUrl: './edit-profile.component.html',
    styleUrls: ['./edit-profile.component.scss']
})
export class EditProfileComponent implements OnInit {
    @Input() user = {};

    private isEditDes = false;
    private isEditFavorite = false;

    private isDisabled = false;

    private description = '';
    private favorite = '';

    constructor(private accountService: AccountService,
                private titleService: Title,
                private notiService: NotificationService) {
    }

    ngOnInit() {
        this.titleService.setTitle('Cập nhật thông tin cá nhân');
    }

    updateDes() {
        this.isDisabled = true;

        this.accountService.updateProfile(this.description, this.user['favorite'])
            .subscribe(
                data => {
                    this.notiService.success('Cập nhật thành công');
                    this.user['description'] = this.description;

                    this.closeEditDes();

                    this.isDisabled = false;
                },
                err => {
                    this.isDisabled = false;
                    this.notiService.error(err);
                });
    }

    updateFavorite() {
        this.isDisabled = true;

        this.accountService.updateProfile(this.user['description'], this.favorite)
            .subscribe(
                data => {
                    this.notiService.success('Cập nhật thành công');
                    this.user['favorite'] = this.favorite;

                    this.closeEditFavorite();

                    this.isDisabled = false;
                },
                err => {
                    this.isDisabled = false;

                    this.notiService.error(err);
                }
            )
    }

    openEditFavorite() {
        this.favorite = this.user['favorite'];

        this.closeEditDes();
        this.isEditFavorite = true;
    }

    closeEditFavorite() {
        this.isEditFavorite = false;
    }

    openEditDes() {
        this.description = this.user['description'];

        this.closeEditFavorite();
        this.isEditDes = true;
    }

    closeEditDes() {
        this.isEditDes = false;
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
