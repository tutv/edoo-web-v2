import {Component, OnInit} from '@angular/core';
import {Input} from "@angular/core/src/metadata/directives";

@Component({
    selector: 'sidebar-list-classes',
    templateUrl: './sidebar-list-classes.component.html',
    styleUrls: ['./sidebar-list-classes.component.css']
})
export class SidebarListClassesComponent implements OnInit {
    @Input() listClasses = [];

    constructor() {
    }

    ngOnInit() {
    }

}
