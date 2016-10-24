import {Component, OnInit} from '@angular/core';
import {Input} from "@angular/core/src/metadata/directives";
import {PostService} from "../../services/post.service";

@Component({
    selector: 'form-comment',
    templateUrl: './form-comment.component.html',
    styleUrls: ['./form-comment.component.css'],
    providers: [PostService]
})
export class FormCommentComponent implements OnInit {
    @Input() post_id;
    public answer: string = '';

    constructor(private postService: PostService) {
    }

    ngOnInit() {
    }

    public submit() {
        this.postService.comment(this.post_id, this.answer)
            .then(
                response => {
                    console.log(response);
                },
                error => {
                    console.log(error);
                }
            )
    }

}
