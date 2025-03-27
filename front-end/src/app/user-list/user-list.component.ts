import { Component } from '@angular/core';

@Component({
  selector: 'app-user-list',
  template: `
  <h1>User List</h1>
  <app-user-card 
    *ngFor="let user of users"
    [user]="user"
    (userSelected)="onUserSelected($event)">
  </app-user-card>
`,
styles: [`
  h1 { text-align: center; }
`]
})
export class UserListComponent {
  users = [
    { name: 'John Doe', email: 'john@example.com', role: 'Admin' },
    { name: 'Jane Smith', email: 'jane@example.com', role: 'User' },
    { name: 'Alice Brown', email: 'alice@example.com', role: 'Manager' }
  ];

  onUserSelected(selectedUser: string) {
    console.log('Selected User:', selectedUser);
    alert(`User selected: ${selectedUser}`);
  }
}
