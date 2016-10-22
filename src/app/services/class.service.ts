import {Injectable} from "@angular/core";
import {ApiService} from "./api.service";

@Injectable()
export class ClassService {

    constructor(private api: ApiService) {
    }

    public getListClasses() {
        var args = {
            method: 'GET',
            url: '/classes'
        };

        return this
            .api.requestAuth(args)
            .map(response => {
                var data = response.json();

                return data.data.classes;
            }).toPromise();
    }
}
