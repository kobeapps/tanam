import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'tanam-root',
  template: '<router-outlet></router-outlet>',
  styles: []
})
export class AppComponent implements OnInit {
  title = 'Tanam CMS';
  constructor() {
  }
}
