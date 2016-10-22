import {WelcomePageComponent} from "./components/welcome-page/welcome-page.component";
import {LoginComponent} from "./components/accounts/login/login.component";
import {ListClassesComponent} from "./components/list-classes/list-classes.component";

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

export const listClass = {
    name: 'class',
    url: '/class',
    component: ListClassesComponent
};
