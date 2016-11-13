import {Component, OnInit, Input} from "@angular/core";
import {ClassService} from "../../services/class.service";
import {Title} from "@angular/platform-browser";

@Component({
    selector: 'app-list-classes',
    templateUrl: './list-classes.component.html',
    styleUrls: ['./list-classes.component.scss'],
    providers: [ClassService]
})

export class ListClassesComponent implements OnInit {
    @Input() listClasses = [];

    constructor(private titleService: Title) {
    }

    ngOnInit() {
        this.titleService.setTitle('Danh sách các lớp môn học');
    }

}

export const listClassState = {
    name: 'classes',
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

