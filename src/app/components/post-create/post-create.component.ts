import {Component, OnInit, Input} from '@angular/core';
import {StorageService} from "../../services/storage.service";
import {PostService} from "../../services/post.service";
import {UIRouter} from "ui-router-ng2";
import {LogService} from "../../services/log.service";

interface ParamsReq {
    title: string;
    content: string;
    class_id: string;
    type: string;
    is_incognito?: boolean;
    event_end?: string;
}

@Component({
    selector: 'app-post-create',
    templateUrl: './post-create.component.html',
    styleUrls: ['./post-create.component.scss']
})
export class PostCreateComponent implements OnInit {
    @Input() classId;
    private isTeacher;
    private user = null;
    public params: ParamsReq;
    private isDisabled = false;

    // DateTime picker
    date: Date;
    datepickerOpts: {};


    constructor(private storage: StorageService,
                private postSrv: PostService,
                private router: UIRouter) {
        this.params = {
            title: '',
            content: '',
            class_id: '',
            type: '',
            is_incognito: false
        };
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

        // Options
        this.datepickerOpts = {
            startDate: new Date(),
            autoclose: true,
            todayBtn: 'linked',
            todayHighlight: true,
            assumeNearbyYear: true,
            format: 'D, dd/mm/yyyy'
        }
    }


    public postPost() {
        if (this.params.title == '' || this.params.content == '') {
            window.alert('Vui lòng điền đầy đủ nội dung.');
            return;
        }

        this.isDisabled = true;

        if (this.params.type == 'event') {
            this.params.event_end = +this.date + '  ';
        }

        this.postSrv.createPost(this.params)
            .then(() => {
                this.router.stateService.go('^.listPost', {'classId': this.classId});
            })
            .catch(() => {
                this.isDisabled = false;
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
