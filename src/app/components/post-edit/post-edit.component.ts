import {Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import {StorageService} from "../../services/storage.service";
import {PostService} from "../../services/post.service";
import {NotificationService} from "../../services/notification.service";
import {LogService} from "../../services/log.service";

@Component({
    selector: 'app-post-edit',
    templateUrl: './post-edit.component.html',
    styleUrls: ['./post-edit.component.scss']
})
export class PostEditComponent implements OnInit {
    @Input() post;
    @Output() onUpdated = new EventEmitter<boolean>();

    private isTeacher;
    private user = null;
    private isDisabled = false;

    // DateTime picker
    date: Date;
    datepickerOpts: {};

    constructor(private storage: StorageService,
                private postSrv: PostService,
                private notification: NotificationService) {
    }

    ngOnInit() {
        console.log(this.post.content);

        this.user = this.storage.getUserData();
        this.isTeacher = this.user.capability == 'teacher';

        // Options
        if (this.post.type != 'event') return;
        this.date = new Date(0);
        this.date.setMilliseconds(this.post.time_end);
        let millisecondStart = (+new Date()) > (this.post.time_end) ? this.post.time_end : (+new Date());
        this.datepickerOpts = {
            startDate: new Date((new Date(0)).setMilliseconds(millisecondStart - 24 * 3600)),
            autoclose: true,
            todayBtn: 'linked',
            todayHighlight: true,
            assumeNearbyYear: true,
            format: 'D, dd/mm/yyyy'
        }
    }

    public handlePostContent(content: string) {
        this.post.content = content;
    }

    public updatePost() {
        if (this.post.title == '' || this.post.content == '') {
            window.alert('Vui lòng điền đầy đủ nội dung.');
            return;
        }

        this.isDisabled = true;

        let params = {};

        if (this.post.type == 'event') {
            params = {
                post_id: this.post.id,
                title: this.post.title,
                content: this.post.content,
                is_incognito: this.post.is_incognito,
                type: this.post.type,
                event_end: this.post.event_end
            }
        } else {
            params = {
                post_id: this.post.id,
                title: this.post.title,
                content: this.post.content,
                is_incognito: this.post.is_incognito,
                type: this.post.type
            }
        }

        this.postSrv.updatePost(params)
            .subscribe(
                () => {
                    this.post.time_end = +this.date + '';
                    this.onUpdated.emit(true);
                    this.notification.success('Cập nhật thành công.');

                    this.isDisabled = false;
                },
                () => {
                    this.isDisabled = false;
                }
            );
    }

}
