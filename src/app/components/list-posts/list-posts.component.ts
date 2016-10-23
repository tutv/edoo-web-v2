import {Component, OnInit, Input} from '@angular/core';

@Component({
    selector: 'list-posts',
    templateUrl: './list-posts.component.html',
    styleUrls: ['./list-posts.component.css']
})
export class ListPostsComponent implements OnInit {
    @Input() classDetails;

    constructor() {
    }

    ngOnInit() {
    }

}
