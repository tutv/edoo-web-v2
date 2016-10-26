import {Component, OnInit} from '@angular/core';
import {Transition, UIRouter} from "ui-router-ng2";
import {ClassService} from "../../services/class.service";
import {Input} from "@angular/core/src/metadata/directives";
import {PostService} from "../../services/post.service";

@Component({
    selector: 'app-post-details',
    templateUrl: './post-details.component.html',
    styleUrls: ['./post-details.component.css'],
    providers: [PostService]
})
export class PostDetailsComponent implements OnInit {
    @Input() post;
    @Input() listClasses;

    constructor(
        private postService: PostService,
        private router: UIRouter
    ) {
    }

    ngOnInit() {
    }

    public onComment(comment) {
        this.post.comments.push(comment);
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
                this.router.stateService.go('classes');
            })
            .catch(error => {
                console.log('Error: ' + error);
            });
    }

}

export const postDetailsState = {
    name: 'post',
    url: '/post/:postId',
    component: PostDetailsComponent,
    resolve: [
        {
            token: 'post',
            deps: [Transition, ClassService],
            resolveFn: (trans, classSvc) => {
                var postId = trans.params().postId;

                console.log('router get PostDetails');
                return classSvc.getPost(postId);
            }
        },
        {
            token: 'listClasses',
            deps: [ClassService],
            resolveFn: (classSvc) => {

                console.log('router get ListClass');

                return classSvc.getListClasses();
            },
        }
    ]
};
