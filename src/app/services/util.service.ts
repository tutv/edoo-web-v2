import {Injectable} from '@angular/core';

@Injectable()
export class UtilService {

    constructor() {
    }

    public backToTop() {
        window.scrollTo(0, 0);
    }
}
