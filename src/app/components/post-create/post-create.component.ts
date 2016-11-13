import {Component, OnInit, Input} from '@angular/core';
import {StorageService} from "../../services/storage.service";
import {PostService} from "../../services/post.service";
import {UIRouter} from "ui-router-ng2";

@Component({
    selector: 'app-post-create',
    templateUrl: './post-create.component.html',
    styleUrls: ['./post-create.component.scss']
})
export class PostCreateComponent implements OnInit {
    @Input() classId;
    private isTeacher;
    private user = null;
    public params = {
        title: '',
        content: '',
        class_id: '',
        type: '',
        is_incognito: false
        // event_end: ''
    };

    constructor(private storage: StorageService,
                private postSrv: PostService,
                private router: UIRouter) {
    }

    public handlePostContent(content: string) {
        this.params.content = content;
    }

    ngOnInit() {
        this.params.class_id = this.classId;
        this.params.type = 'question';

        // this.isTeacher = this.storage.getUserData().capability == 'teacher';
        this.user = this.storage.getUserData();
        this.isTeacher = this.user.capability == 'teacher';
    }

    public postPost() {
        if (this.params.title == '' || this.params.content==''){
            window.alert('Vui lòng điền đầy đủ nội dung.');
            return;
        }

        this.postSrv.createPost(this.params)
            .then(() => {
                this.router.stateService.go('^.listPost', {'classId': this.classId});
            });
    }

}


export const postCreateState = {
    name: 'classPost.create',
    url: '/create',
    component: PostCreateComponent,
    resolve: [
        {
            token: 'classId',
            deps: ['currentClassId'],
            resolveFn: (classId) => {
                return classId;
            }
        }
    ]
};
