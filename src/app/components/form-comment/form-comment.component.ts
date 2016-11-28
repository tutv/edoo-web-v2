import {Component, OnInit, Output, EventEmitter} from '@angular/core';
import {Input} from "@angular/core/src/metadata/directives";
import {PostService} from "../../services/post.service";

@Component({
    selector: 'form-comment',
    templateUrl: './form-comment.component.html',
    styleUrls: ['./form-comment.component.scss'],
    providers: [PostService]
})
export class FormCommentComponent implements OnInit {
    @Input() post_id;
    @Output() onComment = new EventEmitter<any>();

    public answer: string = '';
    private isDisabled = false;

    constructor(private postService: PostService) {
    }

    ngOnInit() {
    }

    public submit() {
        this.isDisabled = true;

        this.postService.comment(this.post_id, this.answer)
            .subscribe(
                data => {
                    let comment = data;
                    delete comment.post;
                    this.answer = '';

                    this.onComment.emit(comment);

                    this.isDisabled = false;
                },
                error => {
                    console.log(error);
                    this.isDisabled = false;
                });
    }

}
