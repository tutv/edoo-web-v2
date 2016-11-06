import {Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import {StorageService} from "../../services/storage.service";
import {PostService} from "../../services/post.service";
import {NotificationService} from "../../services/notification.service";

@Component({
    selector: 'app-post-edit',
    templateUrl: './post-edit.component.html',
    styleUrls: ['./post-edit.component.css']
})
export class PostEditComponent implements OnInit {
    @Input() post;
    @Output() onUpdated = new EventEmitter<boolean>();

    private isTeacher;
    private user = null;

    constructor(private storage: StorageService,
                private postSrv: PostService,
                private notification: NotificationService) {
    }

    ngOnInit() {
        console.log(this.post.content);

        this.user = this.storage.getUserData();
        this.isTeacher = this.user.capability == 'teacher';
    }

    public handlePostContent(content: string) {
        this.post.content = content;
    }

    public updatePost() {
        if (this.post.title == '' || this.post.content == '') {
            window.alert('Vui lòng điền đầy đủ nội dung.');
            return;
        }

        let params = {
            post_id: this.post.id,
            title: this.post.title,
            content: this.post.content,
            is_incognito: this.post.is_incognito,
            type: this.post.type
        };
        this.postSrv.updatePost(params)
            .then(() => {
                this.onUpdated.emit(true);
                this.notification.success('Cập nhật thành công.');
            });
    }

}
