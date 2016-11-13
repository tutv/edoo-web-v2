import {Component, OnInit, Input} from '@angular/core';
import {Transition, UIRouter} from "ui-router-ng2";
import {ClassService} from "../../services/class.service";

@Component({
    selector: 'app-class-post-details',
    templateUrl: './class-post-details.component.html',
    styleUrls: ['./class-post-details.component.scss']
})
export class ClassPostDetailsComponent implements OnInit {
    @Input() listClasses;
    @Input() currentClassId;
    public currentClass;


    constructor(private router: UIRouter) {
    }

    ngOnInit() {
        this.router.stateService.go('.listPost', {'classId': this.listClasses[0].id});
        this.currentClass = this.listClasses[0];
    }

    public onSelected(classId: string){
        this.currentClassId = classId
    }

}

export const classPostDetailsState = {
    name: 'classPost',
    url: '/classes/:classId',
    component: ClassPostDetailsComponent,
    resolve: [
        {
            token: 'listClasses',
            deps: [ClassService],
            resolveFn: (classSvc) => {

                return classSvc.getListClasses();
            }
        },
        {
            token: 'currentClassId',
            deps: [Transition],
            resolveFn: (trans) => {
                return trans.params().classId;
            }
        }
    ]
};
