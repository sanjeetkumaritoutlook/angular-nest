import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterComponent } from './register/register.component';
import { UsersComponent } from './users/users.component';
import { SimpleComponent } from './simple/simple.component';
import { UserListComponent } from './user-list/user-list.component';
import { FileUploadComponent } from './file-upload/file-upload.component';
const routes: Routes = [
  { path: 'register', component: RegisterComponent },
  { path: 'users', component: UsersComponent },
  { path: 'simple', component: SimpleComponent },
  { path: 'user-list', component: UserListComponent },
  { path: 'upload', component: FileUploadComponent },
  { path: '', redirectTo: '/register', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
