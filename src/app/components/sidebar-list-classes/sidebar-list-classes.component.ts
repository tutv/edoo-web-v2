import {Component, OnInit, Output, EventEmitter, HostBinding} from '@angular/core';
import {Input} from "@angular/core/src/metadata/directives";
import {EventService} from "../../services/event.service";

@Component({
    selector: 'sidebar-list-classes',
    templateUrl: './sidebar-list-classes.component.html',
    styleUrls: ['./sidebar-list-classes.component.scss']
})
export class SidebarListClassesComponent implements OnInit{
    @Input() listClasses = [];
    @Input() currentClassId;

    @Output() onSelected = new EventEmitter<any>();

    constructor(private eventService: EventService) {
    }

    ngOnInit() {
        this.eventService.switchClass$
            .subscribe(classId => {
                this.currentClassId = classId;
            })
    }

    public select(classId: string) {
        this.onSelected.emit(classId);
    }
}
