import {Component, OnInit, Input} from "@angular/core";
import {ClassService} from "../../services/class.service";

@Component({
    selector: 'user-rank',
    templateUrl: './user-rank.component.html',
    styleUrls: ['./user-rank.component.scss']
})
export class UserRankComponent implements OnInit {
    public static TAG = 'UserRankComponent';

    @Input() classId;

    private users = [];

    constructor(private classService: ClassService) {
    }

    ngOnInit() {
        this.classService.getClassRank(this.classId)
            .subscribe((data)=> {
                this.users = data.users;
            });
    }


}
