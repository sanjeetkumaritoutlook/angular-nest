import { Component } from '@angular/core';

@Component({
  selector: 'app-simple',
  template: `<h1>{{ title }}</h1>`,
  styleUrl: './simple.component.scss'
})
export class SimpleComponent {
  title = 'Snapshot Testing';
}
