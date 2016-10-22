import {Component, OnInit} from '@angular/core';

@Component({
    selector: 'app-class-details',
    templateUrl: './class-details.component.html',
    styleUrls: ['./class-details.component.css']
})
export class ClassDetailsComponent implements OnInit {

    constructor() {
    }

    ngOnInit() {
    }

}

export const classDetailsState = {
    name: 'class.details',
    url: '/:classId',
    component: ClassDetailsComponent
};
