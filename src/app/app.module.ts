import {BrowserModule} from "@angular/platform-browser";
import {NgModule} from "@angular/core";
import {FormsModule} from "@angular/forms";
import {HttpModule} from "@angular/http";
import {AppComponent} from "./app.component";
import {WelcomePageComponent} from "./components/welcome-page/welcome-page.component";
import {UIRouterModule} from "ui-router-ng2";
import {UIRouterConfig} from "./config/router.config";
import * as states from "./app.states";
import {HeaderComponent} from "./components/header/header.component";
import {FooterComponent} from "./components/footer/footer.component";
import {LoginComponent, loginState} from "./components/login/login.component";
import {ApiService} from "./services/api.service";
import {StorageService} from "./services/storage.service";
import {CookieService} from "angular2-cookie/services/cookies.service";
import {EventService} from "./services/event.service";
import {ListClassesComponent, listClassState} from "./components/list-classes/list-classes.component";
import {ClassService} from "./services/class.service";
import {EditProfileComponent} from "./components/edit-profile/edit-profile.component";
import {ClassDetailsComponent, classDetailsState} from "./components/class-details/class-details.component";
import {ListPostsComponent} from "./components/list-posts/list-posts.component";

@NgModule({
    declarations: [
        AppComponent,
        WelcomePageComponent,
        HeaderComponent,
        FooterComponent,
        LoginComponent,
        ListClassesComponent,
        EditProfileComponent,
        ClassDetailsComponent,
        ListPostsComponent
    ],
    imports: [
        BrowserModule,
        FormsModule,
        HttpModule,
        UIRouterModule.forRoot({
            states: [
                states.welcomeState,
                loginState,
                listClassState,
                classDetailsState
            ],
            useHash: false,
            configClass: UIRouterConfig
        })
    ],
    providers: [
        ApiService,
        StorageService,
        CookieService,
        EventService,
        ClassService
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
