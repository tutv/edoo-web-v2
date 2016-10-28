import {Component, OnInit, Input} from '@angular/core';

@Component({
  selector: 'app-post-create',
  templateUrl: './post-create.component.html',
  styleUrls: ['./post-create.component.css']
})
export class PostCreateComponent implements OnInit {
    @Input() post;

  constructor() { }

  ngOnInit() {
  }

}


export const postCreateState = {
    name: 'classPost.create',
    url: '/createPost',
    component: PostCreateComponent
};
