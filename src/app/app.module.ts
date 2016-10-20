import {BrowserModule} from "@angular/platform-browser";
import {NgModule} from "@angular/core";
import {FormsModule} from "@angular/forms";
import {HttpModule} from "@angular/http";
import {AppComponent} from "./app.component";
import {WelcomePageComponent} from "./welcome-page/welcome-page.component";
import {UIRouterModule} from "ui-router-ng2";
import {UIRouterConfig} from "./config/router.config";
import * as states from "./app.states";
import {HeaderComponent} from "./header/header.component";
import {FooterComponent} from "./footer/footer.component";
import {LoginComponent} from "./accounts/login/login.component";

@NgModule({
    declarations: [
        AppComponent,
        WelcomePageComponent,
        HeaderComponent,
        FooterComponent,
        LoginComponent
    ],
    imports: [
        BrowserModule,
        FormsModule,
        HttpModule,
        UIRouterModule.forRoot({
            states: [
                states.welcomeState,
                states.loginState
            ],
            useHash: false,
            configClass: UIRouterConfig
        })
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule {
}
