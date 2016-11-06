import {Injectable} from '@angular/core';
import {ApiService} from "./api.service";

@Injectable()
export class PostService {

    constructor(private api: ApiService) {
    }

    public comment(post_id, content) {
        var data = {
            post_id: post_id,
            content: content
        };

        var args = {
            method: 'POST',
            url: '/cmt',
            data: data
        };

        return this.api
            .requestAuth(args)
            .map(response => {
                return response['data'];
            })
            .toPromise();
    }

    /**
     * Vote Post
     * @param post_id
     * @param content:
     *          1: vote,     0: cancel vote/devote,      -1: devote
     */
    public votePost(post_id, content) {
        var data = {
            post_id: post_id,
            content: content
        };

        var args = {
            method: 'POST',
            url: '/votepost',
            data: data
        };

        return this.api
            .requestAuth(args)
            .map(response => {
                return response['data'];
            })
            .toPromise();
    }


    public deletePost(post_id) {

        var args = {
            method: 'POST',
            url: '/deletepost',
            data: {post_id: post_id}
        };

        return this.api
            .requestAuth(args)
            // .toPromise();
            .map(response => {
                return response['data'];
            }).toPromise();
    }

    public createPost(params) {
        var args = {
            method: 'POST',
            url: '/post',
            data: params
        };

        return this.api
            .requestAuth(args)
            .map(response => {
                return response['data'];
            })
            .toPromise();
    }

    // ----------------------------------------- Comment ---------------------------------------------------------------

    public solveComment(comment_id) {

        var args = {
            method: 'POST',
            url: '/solve',
            data: {comment_id: comment_id}
        };

        return this.api
            .requestAuth(args)
            .map(response => {
                return response['data'];
            })
            .toPromise();
    }

    public unsolveComment(comment_id) {

        var args = {
            method: 'POST',
            url: '/unsolve',
            data: {comment_id: comment_id}
        };

        return this.api
            .requestAuth(args)
            .map(response => {
                return response['data'];
            })
            .toPromise();
    }

    public voteComment(comment_id) {

        var args = {
            method: 'POST',
            url: '/votecmt',
            data: {comment_id: comment_id}
        };

        return this.api
            .requestAuth(args)
            .map(response => {
                return response['data'];
            })
            .toPromise();
    }

    public devoteComment(comment_id) {

        var args = {
            method: 'POST',
            url: '/devotecmt',
            data: {comment_id}
        };

        return this.api
            .requestAuth(args)
            .map(response => {
                return response['data'];
            })
            .toPromise();
    }

    public unvoteComment(comment_id) {
        var args = {
            method: 'POST',
            url: '/unvote',
            data: {comment_id: comment_id}
        };

        return this.api
            .requestAuth(args)
            .map(response => {
                return response['data'];
            })
            .toPromise();
    }
}
