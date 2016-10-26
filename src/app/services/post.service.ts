import {Injectable} from '@angular/core';
import {ApiService} from "./api.service";

@Injectable()
export class PostService {

    constructor(private api: ApiService) {
    }

    public comment(post_id, content) {
        var data = `post_id=${post_id}&content=${content}`;

        var args = {
            method: 'POST',
            url: '/cmt',
            data: data
        };

        return this.api
            .requestAuth(args)
            .map(response => {
                var data = response.json();

                return data.data;
            })
            .toPromise();
    }

    /**
     * Vote Post
     * @param post_id
     * @param content:
     *          1: vote,     0: cancel vote/devote,      -1: devote
     */
    public votePost(post_id, content){
        var data = `post_id=${post_id}&content=${content}`;

        var args = {
            method: 'POST',
            url: '/votepost',
            data: data
        };

        return this.api
            .requestAuth(args)
            .map(response => {
                var data = response.json();

                return data.data;
            })
            .toPromise();
    }


    public deletePost(post_id){
        var data = `post_id=${post_id}`;

        var args = {
            method: 'POST',
            url: '/deletepost',
            data: data
        };

        return this.api
            .requestAuth(args)
            // .map(respose => {
            //     var data = respose.json();
            //
            //     return data.data;
            // })
            .toPromise();
    }

}
