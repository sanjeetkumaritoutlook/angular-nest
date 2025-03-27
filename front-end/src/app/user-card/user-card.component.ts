import { Component, Input, Output, EventEmitter  } from '@angular/core';

@Component({
  selector: 'app-user-card',
  template: `
  <div class="card">
    <h2>{{ user.name }}</h2>
    <p>Email: {{ user.email }}</p>
    <p>Role: {{ user.role }}</p>
    <button (click)="selectUser()">Select</button>
  </div>
`,
styles: [`
  .card { border: 1px solid #ccc; padding: 10px; margin: 10px; }
  h2 { margin: 0; }
`]
})
export class UserCardComponent {
  @Input() user!: { name: string; email: string; role: string };
  @Output() userSelected = new EventEmitter<string>();

  selectUser() {
    this.userSelected.emit(this.user.name);
  }
}
