import {Component, OnInit} from "@angular/core";
import {ClassService} from "../../services/class.service";
import {Transition} from "ui-router-ng2";
import {Input} from "@angular/core/src/metadata/directives";
import {Title} from "@angular/platform-browser";

@Component({
    selector: 'app-class-details',
    templateUrl: './class-details.component.html',
    styleUrls: ['./class-details.component.css']
})
export class ClassDetailsComponent implements OnInit {
    public class_id;
    @Input() classDetails;

    constructor(private transition: Transition,
                private titleService: Title) {
        this.class_id = transition.params()['classId'];
    }

    ngOnInit() {
        this.titleService.setTitle(this.classDetails.name);
    }
}

export const classDetailsState = {
    name: 'classPost.listPost',
    url: '^/class/:classId',
    component: ClassDetailsComponent,
    resolve: [
        {
            token: 'classDetails',
            deps: [Transition, ClassService],
            resolveFn: (trans, classSvc) => {
                var classId = trans.params().classId;

                return classSvc.getPosts(classId);
            }
        }
    ]
};
