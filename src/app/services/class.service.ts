import {Injectable} from "@angular/core";
import {ApiService} from "./api.service";

@Injectable()
export class ClassService {

    constructor(private api: ApiService) {
    }

    public getListClasses() {
        var args = {
            method: 'GET',
            url: '/classes',
            ignoreLoadingBar: true
        };

        return this
            .api.requestAuth(args)
            .map(response => {
                return response['data'].classes;
            }).toPromise();
    }

    public getPosts(class_id, page = 1) {
        var args = {
            method: 'GET',
            url: '/posts/' + class_id + '/page/' + page
        };

        return this
            .api.requestAuth(args)
            .map(response => {
                return response['data'];
            }).toPromise();
    }

    public getPost(post_id) {
        var args = {
            method: 'GET',
            url: '/post/' + post_id
        };

        return this
            .api.requestAuth(args)
            .map(response => {
                return response['data'];
            }).toPromise();
    }

    public getClassRank(class_id) {
        let args = {
            method: 'GET',
            url: '/classrank/' + class_id,
            ignoreLoadingBar: true
        };

        return this
            .api.requestAuth(args)
            .map(response => {
                return response['data'];
            }).toPromise();
    }
}
