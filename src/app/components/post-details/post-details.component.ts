import {Component, OnInit} from '@angular/core';
import {Transition, UIRouter} from "ui-router-ng2";
import {ClassService} from "../../services/class.service";
import {Input} from "@angular/core/src/metadata/directives";
import {PostService} from "../../services/post.service";
import {StorageService} from "../../services/storage.service";

@Component({
    selector: 'app-post-details',
    templateUrl: './post-details.component.html',
    styleUrls: ['./post-details.component.css']
    // providers: [PostService]
})
export class PostDetailsComponent implements OnInit {
    @Input() post;
    @Input() listClasses;


    constructor() {
    }

    ngOnInit() {

    }


}

export const postDetailsState = {
    name: 'post',
    url: '/post/:postId',
    component: PostDetailsComponent,
    resolve: [
        {
            token: 'post',
            deps: [Transition, ClassService],
            resolveFn: (trans, classSvc) => {
                var postId = trans.params().postId;

                console.log('router get PostDetails');
                return classSvc.getPost(postId);
            }
        },
        {
            token: 'listClasses',
            deps: [ClassService],
            resolveFn: (classSvc) => {

                console.log('router get ListClass');

                return classSvc.getListClasses();
            },
        }
    ]
};
