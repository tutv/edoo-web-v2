import {Component, OnInit, Input} from '@angular/core';
import {ClassService} from "../../services/class.service";
import {LogService} from "../../services/log.service";

@Component({
    selector: 'user-rank',
    templateUrl: './user-rank.component.html',
    styleUrls: ['./user-rank.component.css']
})
export class UserRankComponent implements OnInit {
    public static TAG = 'UserRankComponent';

    @Input() classId;

    private users = [];

    constructor(private classService: ClassService) {
    }

    ngOnInit() {
        this.classService.getClassRank(this.classId)
            .then((data)=> {
                this.users = data.users;

                // log for testing
                // LogService.i(UserRankComponent.TAG, this.users.toString());
                // LogService.i(UserRankComponent.TAG, 'class_id = ' + this.classId);
            });
    }


}
