import { Component } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { UserAuth } from '../../interfaces/userAuth.interfaces';
import { UserService } from '../../services/user.service';
import { octDatabase } from '@ng-icons/octicons';

@Component({
  selector: 'app-sign-up',
  standalone: true,
  imports: [RouterLink, ReactiveFormsModule],
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.css',
})
export class SignUpComponent {
  user: UserAuth = {
    userName: '',
    email: '',
    password: '',
    isOwner: false,
  };

  registerForm = this.fb.group({
    userName: ['', Validators.required],
    email: ['', Validators.required],
    password: ['', Validators.required],
    repassword: ['', Validators.required],
    isOwner: [false, Validators.required],
  });

  registerErrorMessage: string = '';

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private userService: UserService
  ) {}

  setRegisterErrorMessage(message: string) {
    this.registerErrorMessage = message;
  }

  onSignUp() {
    if (!this.registerForm.valid) {
      this.setRegisterErrorMessage('Please fill all the fields.');
      return;
    }

    const userName = this.registerForm.value.userName!;
    const email = this.registerForm.value.email!;
    const password = this.registerForm.value.password!;
    const repassword = this.registerForm.value.repassword;
    const isOwner = this.registerForm.value.isOwner!;

    if (!this.isValidUsername(userName)) {
      return;
    }

    if (!this.isValidPassword(password)) {
      return;
    }

    if (password !== repassword) {
      this.setRegisterErrorMessage('The passwords do not match.');
      return;
    }

    const data = {
      userName: userName,
      password: password,
      email: email,
      isOwner: isOwner,
    };

    this.setRegisterErrorMessage(' ');

    this.userService.register(data).subscribe({
      next: () => this.router.navigateByUrl('/login'),
      error: (error) => this.setRegisterErrorMessage(error.message),
    });
  }

  private isValidUsername(userName: string): boolean {
    if (userName.length < 8 || userName.length > 15) {
      this.setRegisterErrorMessage(
        'The username must be between 8 and 15 characters.'
      );
    } else if (/\s/.test(userName)) {
      this.setRegisterErrorMessage('The username cannot contain spaces.');
    } else if (!/^[A-Za-z]/.test(userName)) {
      this.setRegisterErrorMessage('The username must start with a letter.');
    } else {
      return true;
    }
    return false;
  }

  private isValidPassword(password: string): boolean {
    if (password.length < 12 || password.length > 20) {
      this.setRegisterErrorMessage(
        'The password must be between 12 and 20 characters.'
      );
    } else if (!/[A-Z]/.test(password)) {
      this.setRegisterErrorMessage(
        'The password must include at least one uppercase letter.'
      );
    } else if (!/[a-z]/.test(password)) {
      this.setRegisterErrorMessage(
        'The password must include at least one lowercase letter.'
      );
    } else if (!/\d/.test(password)) {
      this.setRegisterErrorMessage(
        'The password must include at least one number.'
      );
    } else if (!/[-!@#$%^&*(),.?":{}|<>]/.test(password)) {
      this.setRegisterErrorMessage(
        'The password must include at least one special character.'
      );
    } else {
      return true;
    }
    return false;
  }
}
