import {Component, OnInit} from '@angular/core';
import {Transition, UIRouter} from "ui-router-ng2";
import {ClassService} from "../../services/class.service";
import {Input} from "@angular/core/src/metadata/directives";
import {PostService} from "../../services/post.service";
import {StorageService} from "../../services/storage.service";
import {NotificationService} from "../../services/notification.service";
import {LogService} from "../../services/log.service";

// var FileSaver = require('file-saver');

@Component({
    selector: 'app-post-details',
    templateUrl: './post-details.component.html',
    styleUrls: ['./post-details.component.scss'],
    providers: [PostService, StorageService]
})
export class PostDetailsComponent implements OnInit {
    @Input() post;
    @Input() listClasses;
    private mode = '';
    public user = null;


    constructor(private postService: PostService,
                private router: UIRouter,
                private storageService: StorageService,
                private notification: NotificationService) {
    }

    ngOnInit() {
        this.mode = 'preview';

        this.user = this.storageService.getUserData();

        // Truong hop bai viet an danh
        if (this.post.author == null) {
            this.post.author = {
                id: -1
            }
        }

        console.log('post: ' + this.post.toString());
        if (this.post.type == 'event') {
            this.post.listExercise = [];
            this.postService.checkEvent(this.post.id)
                .then(data => {
                    this.post.listExercise = data['attack_files'];
                })
        }
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
            .then(
                data => {
                    this.post.vote_count = data.vote_count;
                },
                error => {
                    window.alert('Bạn không thể đánh giá cho bài viết này nữa! ' + error);
                });
    }

    public deletePost(post_id) {
        if (confirm("Xóa bài viết?") == false) {
            return;
        }

        this.postService.deletePost(post_id)
            .then(
                () => {
                    this.notification.success('Xóa bài viết thành công!');
                    this.router.stateService.go('^.listPost', {'classId': this.post.class.id});
                },
                error => {
                    LogService.i('Error: ', error);
                })
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

    public getListExercise(){
        // this.notification.information('Danh sach nop bai tap');
    }

    public downloadAllExercise(){
        this.postService.downloadAllExercise(this.post.id)
            .subscribe(
                response => {
                    window.location.href = response;
                },
                error => {
                    this.notification.error(`Không thể tải file về!${error.toString()}`);
                }
            )
    }


}

export const postDetailsState = {
    name: 'classPost.post',
    url: '/post/:postId',
    component: PostDetailsComponent,
    resolve: [
        {
            token: 'post',
            deps: [Transition, ClassService],
            resolveFn: (trans, classSvc) => {
                var postId = trans.params().postId;

                LogService.i('POST', 'router get PostDetails');
                return classSvc.getPost(postId);
            }
        },
        {
            token: 'listClasses',
            deps: [Transition, 'listClasses'],
            resolveFn: (trans, list) => {

                LogService.i('OK', 'router get ListClass');

                return list;
            },
        }
    ]
};
