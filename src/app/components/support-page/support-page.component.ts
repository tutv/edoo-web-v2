import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'support-page',
  templateUrl: './support-page.component.html',
  styleUrls: ['./support-page.component.css']
})
export class SupportPageComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}

export const supportState = {
    name: 'support',
    url: '/support',
    component: SupportPageComponent
};
