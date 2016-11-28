import {Component, OnInit, Output, EventEmitter} from '@angular/core';
import {Input} from "@angular/core/src/metadata/directives";
import {PostService} from "../../services/post.service";

@Component({
    selector: 'comment-item',
    templateUrl: './comment-item.component.html',
    styleUrls: ['./comment-item.component.scss']
})
export class CommentItemComponent implements OnInit {
    @Input() comment;
    @Input() data;
    @Output() onSolveComment = new EventEmitter<any>();
    private permission;

    constructor(private postService: PostService) {
    }

    ngOnInit() {
        this.permission = {
            allow_vote_cmt: this.data.user_id != this.comment.author.id && this.data.user_id != this.comment.author.id,
            allow_solve_cmt: this.data.user_id == this.data.post_id && this.data.user_id != this.comment.author.id,
            allow_delete_cmt: this.comment.author.id == this.data.user_id
        }

    }

    public voteComment() {
        if (!this.permission.allow_vote_cmt) {
            window.alert('Bạn không thể đánh giá bình luận này!');
            return;
        }

        this.postService.voteComment(this.comment.id)
            .subscribe(data => {
                this.comment.vote_count = data['vote_count'];
            });
    }

    public devoteComment() {
        if (!this.permission.allow_vote_cmt) {
            window.alert('Bạn không thể đánh giá bình luận này!');
            return;
        }

        this.postService.devoteComment(this.comment.id)
            .subscribe(data => {
                this.comment.vote_count = data['vote_count'];
            });
    }

    public solveComment() {
        if (!this.permission.allow_solve_cmt) return;

        this.postService.solveComment(this.comment.id)
            .subscribe(data => {
                this.comment.is_solve = true;
                this.onSolveComment.emit();
            })
    }

    public unsolveComment() {
        if (!this.permission.allow_solve_cmt) return;

        this.postService.unsolveComment(this.comment.id)
            .subscribe(data => {
                this.comment.is_solve = false;
            });
    }
}
