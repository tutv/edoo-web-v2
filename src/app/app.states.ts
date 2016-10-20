import {WelcomePageComponent} from "./welcome-page/welcome-page.component";
import {LoginComponent} from "./accounts/login/login.component";

export const welcomeState = {
    name: 'welcome',
    url: '/welcome',
    component: WelcomePageComponent
};

export const loginState = {
    name: 'login',
    url: '/login',
    component: LoginComponent
};
