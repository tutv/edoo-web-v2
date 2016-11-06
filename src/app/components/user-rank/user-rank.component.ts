import {Component, OnInit} from '@angular/core';
import {ClassService} from "../../services/class.service";
import {LogService} from "../../services/log.service";

@Component({
    selector: 'user-rank',
    templateUrl: './user-rank.component.html',
    styleUrls: ['./user-rank.component.css']
})
export class UserRankComponent implements OnInit {
    public static TAG = 'UserRankComponent';

    private users = [];

    constructor(private classService: ClassService) {
    }

    // todo: lấy class_id vào cho user-rank-component
    ngOnInit() {
        let currentClassId = 'POL100111-2016-2017';
        this.classService.getClassRank(currentClassId)
            .then((data)=> {
                this.users = data.users;
                LogService.i(UserRankComponent.TAG, this.users.toString());
            });
    }


}
