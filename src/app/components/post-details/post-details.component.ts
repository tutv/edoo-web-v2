import {Component, OnInit} from '@angular/core';
import {Transition} from "ui-router-ng2";
import {ClassService} from "../../services/class.service";
import {Input} from "@angular/core/src/metadata/directives";

@Component({
    selector: 'app-post-details',
    templateUrl: './post-details.component.html',
    styleUrls: ['./post-details.component.css']
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

                return classSvc.getPost(postId);
            }
        },
        {
            token: 'listClasses',
            deps: [ClassService],
            resolveFn: (classSvc) => {

                return classSvc.getListClasses();
            }
        }
    ]
};
