import {Component, OnInit} from "@angular/core";
import {ClassService} from "../../services/class.service";
import {Transition} from "ui-router-ng2";
import {Input} from "@angular/core/src/metadata/directives";
import {Title} from "@angular/platform-browser";

@Component({
    selector: 'app-class-details',
    templateUrl: './class-details.component.html',
    styleUrls: ['./class-details.component.scss']
})
export class ClassDetailsComponent implements OnInit {
    public class_id;
    public currentPage = 1;

    @Input() classDetails;

    constructor(private transition: Transition,
                private titleService: Title) {
        var params = transition.params();

        console.log(params);
        this.class_id = params['classId'];
        var page = params['page'];

        if (!page) {
            page = 1;
        }

        this.currentPage = page;
    }

    ngOnInit() {
        this.titleService.setTitle(this.classDetails.name);
    }
}

export const classDetailsState = {
    name: 'classPost.listPost',
    url: '^/class/:classId?page',
    component: ClassDetailsComponent,
    resolve: [
        {
            token: 'classDetails',
            deps: [Transition, ClassService],
            resolveFn: (trans, classSvc) => {
                var params = trans.params();
                var classId = params.classId;
                var page = params['page'];

                if (!page) {
                    page = 1;
                }

                return classSvc.getPosts(classId, page);
            }
        }
    ]
};
