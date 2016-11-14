import {Injectable} from "@angular/core";
import {environment} from "../../environments/environment";

@Injectable()
export class LogService {

    constructor() {
    }

    public static i(tag: string, msg: any) {
        if (environment.production) {
            return;
        }

        console.info(`INFO: ${tag} : ${msg}`);
    }

    public static e(tag: string, msg: any) {
        if (environment.production) {
            return;
        }

        console.error(`ERROR: ${tag} : ${msg}`);
    }
}
