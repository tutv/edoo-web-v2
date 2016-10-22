import {Component, OnInit, Input} from '@angular/core';
import {ClassService} from "../../services/class.service";

@Component({
    selector: 'app-list-classes',
    templateUrl: './list-classes.component.html',
    styleUrls: ['./list-classes.component.css'],
    providers: [ClassService]
})

export class ListClassesComponent implements OnInit {
    @Input() listClasses = [];

    constructor() {
    }

    ngOnInit() {
    }

}

export const listClassState = {
    name: 'class',
    url: '/class',
    component: ListClassesComponent,
    resolve: [
        {
            token: 'listClasses',
            deps: [ClassService],
            resolveFn: (classSvc) => classSvc.getListClasses()
        }
    ]
};

