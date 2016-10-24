import {Component, OnInit} from '@angular/core';
import {Input} from "@angular/core/src/metadata/directives";

@Component({
    selector: 'comment-item',
    templateUrl: './comment-item.component.html',
    styleUrls: ['./comment-item.component.css']
})
export class CommentItemComponent implements OnInit {
    @Input() comment;
    @Input() byPostAuthor;

    constructor() {
    }

    ngOnInit() {
    }

}
