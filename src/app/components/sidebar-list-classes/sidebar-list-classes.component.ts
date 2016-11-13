import {Component, OnInit, Output, EventEmitter} from '@angular/core';
import {Input} from "@angular/core/src/metadata/directives";

@Component({
    selector: 'sidebar-list-classes',
    templateUrl: './sidebar-list-classes.component.html',
    styleUrls: ['./sidebar-list-classes.component.scss']
})
export class SidebarListClassesComponent implements OnInit {
    @Input() listClasses = [];
    @Output() onSelected = new EventEmitter<any>();

    constructor() {
    }

    ngOnInit() {
    }

    public select(classId: string){
        this.onSelected.emit(classId);
    }

}
