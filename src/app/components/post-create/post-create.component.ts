import {Component, OnInit, Input} from '@angular/core';
import {StorageService} from "../../services/storage.service";
import {PostService} from "../../services/post.service";
import {UIRouter} from "ui-router-ng2";

@Component({
    selector: 'app-post-create',
    templateUrl: './post-create.component.html',
    styleUrls: ['./post-create.component.css']
})
export class PostCreateComponent implements OnInit {
    @Input() classId;
    private isTeacher;
    public params = {
        title: '',
        content: '',
        class_id: '',
        type: '',
        is_incognito: '',
        event_end: ''
    };

    constructor(private storage: StorageService,
                private postSrv: PostService,
                private router: UIRouter) {
    }

    ngOnInit() {
        this.params.class_id = this.classId;
        this.params.type = 'question';

        // this.isTeacher = this.storage.getUserData().capability == 'teacher';
        var user = null;
        user = this.storage.getUserData();
        console.log('capability ' + user.capability);
        this.isTeacher = user.capability == 'teacher';
    }


    public postPost() {
        console.log('title = ' + this.params.title + ', content = ' + this.params.content);

        this.postSrv.createPost(this.params)
            .then(() => {
                console.log('Post post success');
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
