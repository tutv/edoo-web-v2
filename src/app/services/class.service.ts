import {Injectable} from "@angular/core";
import {ApiService} from "./api.service";
import {EventService} from "./event.service";

@Injectable()
export class ClassService {

    constructor(private api: ApiService,
                private eventService: EventService) {
    }

    public getListClasses() {
        let args = {
            method: 'GET',
            url: '/classes',
            ignoreLoadingBar: true
        };

        return this
            .api.requestAuth(args)
            .map(response => {
                return response['data'].classes;
            });
    }

    public getPosts(class_id, page = 1) {
        let args = {
            method: 'GET',
            url: '/posts/' + class_id + '/page/' + page
        };

        let postReq = this
            .api.requestAuth(args)
            .map(response => {
                return response['data'];
            });

        this.eventService.switchClass(class_id);

        return postReq;
    }

    public getPost(post_id) {
        let args = {
            method: 'GET',
            url: '/post/' + post_id
        };

        return this
            .api.requestAuth(args)
            .map(response => {
                return response['data'];
            });
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
            });
    }
}
