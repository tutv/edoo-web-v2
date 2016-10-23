import {Component, OnInit} from "@angular/core";
import {ClassService} from "../../services/class.service";
import {Transition} from "ui-router-ng2";
import {Input} from "@angular/core/src/metadata/directives";

@Component({
    selector: 'app-class-details',
    templateUrl: './class-details.component.html',
    styleUrls: ['./class-details.component.css']
})
export class ClassDetailsComponent implements OnInit {
    public class_id;
    @Input() classDetails;
    @Input() listClasses;

    constructor(private transition: Transition) {
        this.class_id = transition.params()['classId'];

    }

    ngOnInit() {
    }
}

export const classDetailsState = {
    name: 'class',
    url: '/class/:classId',
    component: ClassDetailsComponent,
    resolve: [
        {
            token: 'classDetails',
            deps: [Transition, ClassService],
            resolveFn: (trans, classSvc) => {
                var classId = trans.params().classId;

                return classSvc.getPosts(classId);
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
