import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { UserService } from '../user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {
  registerForm: FormGroup;
  successMessage: string = '';
  constructor(private fb: FormBuilder, private userService: UserService,private router: Router) {
    this.registerForm = this.fb.group({
      name: [''],
      email: [''],
      password: ['']
    });
  }

  onSubmit() {
    if (this.registerForm.valid) {
    this.userService.createUser(this.registerForm.value).subscribe(
      (response) => {
        this.successMessage = response.message;
        setTimeout(() => {
          this.router.navigate(['/users']); // 👈 Navigate after success
        }, 2000);
      },
      (error) => {
        console.error('Error:', error);
        alert('Registration failed. Check the console for details.');
      }
    );
  } else {
    console.error('Form is invalid');
  }
  }
}
