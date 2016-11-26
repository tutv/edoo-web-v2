import {Injectable} from '@angular/core';
import {ApiService} from "./api.service";

@Injectable()
export class PostService {

    constructor(private api: ApiService) {
    }

    public comment(post_id, content) {
        let data = {
            post_id: post_id,
            content: content
        };

        let args = {
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
        let data = {
            post_id: post_id,
            content: content
        };

        let args = {
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

        let args = {
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
        let args = {
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

    public updatePost(params) {
        let args = {
            method: 'POST',
            url: '/updatepost',
            data: params
        };

        return this.api
            .requestAuth(args)
            .map(response => {
                return response['data'];
            })
            .toPromise();
    }

    // ---------------------------------------- Exercise ---------------------------------------------------------------
    public checkEvent(post_id) {
        let args = {
            method: 'GET',
            url: '/checkevent/' + post_id
        };

        return this.api
            .requestAuth(args)
            .map(response => {
                return response['data'];
            })
            .toPromise();
    }

    public downloadAllExercise(post_id){
        let args = {
            method: 'GET',
            url: '/geteventfiles/' + post_id
        };

        return this.api
            .requestAuth(args)
            .map(response => {
                return response['data'];
            });
    }

    // ----------------------------------------- Comment ---------------------------------------------------------------

    public solveComment(comment_id) {

        let args = {
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

        let args = {
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

        let args = {
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

        let args = {
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
        let args = {
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
