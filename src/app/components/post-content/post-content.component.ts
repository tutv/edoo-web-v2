import {Component, OnInit, Input} from '@angular/core';
import {UIRouter} from "ui-router-ng2";
import {PostService} from "../../services/post.service";
import {StorageService} from "../../services/storage.service";

@Component({
    selector: 'app-post-content',
    templateUrl: './post-content.component.html',
    styleUrls: ['./post-content.component.css'],
    providers: [PostService, StorageService]
})
export class PostContentComponent implements OnInit {
    @Input() post;
    public user = null;

    constructor(private postService: PostService,
                private router: UIRouter,
                private storageService: StorageService) {
    }

    ngOnInit() {
        this.user = this.storageService.getUserData();
    }

    public onComment(comment) {
        this.post.comments.push(comment);
    }

    /**
     * Receive event: Other comment is solved -> Unsolved comment
     * @param comment_id
     */
    public onSolveComment(comment_id) {
        for (let comment of this.post.comments) {
            if (comment.id != comment_id && comment.is_solve) {
                comment.is_solve = false;
                break;
            }
        }
    }

    public votePost(post_id, content) {
        this.postService.votePost(post_id, content)
            .then(data => {
                this.post.vote_count = data.vote_count;
            })
            .catch(error => {
                window.alert('Bạn không thể đánh giá cho bài viết này nữa! ' + error);
            });
    }

    public deletePost(post_id) {
        if (confirm("Xóa bài viết?") == false) {
            return;
        }

        this.postService.deletePost(post_id)
            .then(() => {
                window.alert('Xóa bài viết thành công!');
                this.router.stateService.go('class', {'classId': this.post.class.id});
            })
            .catch(error => {
                console.log('Error: ' + error);
            });
    }

    /**
     * AlterPost include: Edit and DeletePost
     * @returns {boolean}
     */
    public allowAlterPost() {
        return this.user.id == this.post.author.id;
    }

    public getData() {
        return {
            user_id: this.user.id,
            post_id: this.post.author.id
        };
    }

}
