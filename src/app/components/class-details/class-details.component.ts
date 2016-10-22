import {Component, OnInit} from '@angular/core';
import {ClassService} from "../../services/class.service";
import {Transition, UIRouter} from "ui-router-ng2";
import {Input} from "@angular/core/src/metadata/directives";

@Component({
    selector: 'app-class-details',
    templateUrl: './class-details.component.html',
    styleUrls: ['./class-details.component.css']
})
export class ClassDetailsComponent implements OnInit {
    @Input() classDetails;
    public class_id;

    constructor(private router: UIRouter,
                private transition: Transition) {
        this.class_id = transition.params()['classId'];

        console.log(this.class_id);
    }

    ngOnInit() {
    }

}

export const classDetailsState = {
    name: 'class.details',
    url: '/:classId',
    component: ClassDetailsComponent,
    resolve: [
        {
            token: 'classDetails',
            deps: [Transition, ClassService],
            resolveFn: (trans, classSvc) => {
                var classId = trans.params().classId;

                return classSvc.getListClasses();
            }
        }
    ]
};
