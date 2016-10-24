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

}
