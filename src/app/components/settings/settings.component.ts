import {Component, OnInit} from '@angular/core';

@Component({
    selector: 'settings',
    templateUrl: './settings.component.html',
    styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {

    constructor() {
    }

    ngOnInit() {
    }

}

export const settingsState = {
    name: 'settings',
    url: '/settings',
    component: SettingsComponent
};
