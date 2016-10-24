import {UIRouter} from "ui-router-ng2";
import {Inject, Injectable} from "@angular/core";

/** UIRouter Config  */
@Injectable()
export class UIRouterConfig {
    constructor(@Inject(UIRouter) router: UIRouter) {
        // router.urlRouterProvider.otherwise(()=> {
        //     var router = new UIRouter();
        //
        //     return router.stateService.go('welcome');
        // });
    }
}
