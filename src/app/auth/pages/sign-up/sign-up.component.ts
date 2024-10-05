import { Component } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { UserAuth } from '../../interfaces/userAuth.interfaces';
import { UserService } from '../../services/user.service';

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
      this.setRegisterErrorMessage('Diligenciar los campos');
      return;
    }
    console.log('this.registerForm.valid', this.registerForm.valid);

    const userName = this.registerForm.value.userName!;
    const email = this.registerForm.value.email!;
    const password = this.registerForm.value.password!;
    const repassword = this.registerForm.value.repassword;
    const isOwner = this.registerForm.value.isOwner!;

    if (userName.length < 8 || userName.length > 15) {
      this.setRegisterErrorMessage(
        'El nombre de usuario debe tener entre 8 y 15 caracteres.'
      );
      return;
    } else if (/\s/.test(userName)) {
      this.setRegisterErrorMessage(
        'El nombre de usuario no puede contener espacios.'
      );
      return;
    } else if (!/^[A-Za-z]/.test(userName)) {
      this.setRegisterErrorMessage(
        'El nombre de usuario debe comenzar con una letra.'
      );
      return;
    }

    if (password.length < 12 || password.length > 20) {
      this.setRegisterErrorMessage(
        'La contraseña debe tener entre 12 y 20 caracteres.'
      );
      return;
    } else if (!/[A-Z]/.test(password)) {
      this.setRegisterErrorMessage(
        'La contraseña debe incluir al menos una letra en mayúsculas.'
      );
      return;
    } else if (!/[a-z]/.test(password)) {
      this.setRegisterErrorMessage(
        'La contraseña debe incluir al menos una letra en minúsculas.'
      );
      return;
    } else if (!/\d/.test(password)) {
      this.setRegisterErrorMessage(
        'La contraseña debe incluir al menos un número.'
      );
      return;
    } else if (!/[-!@#$%^&*(),.?":{}|<>]/.test(password)) {
      this.setRegisterErrorMessage(
        'La contraseña debe incluir al menos un carácter especial.'
      );
      return;
    }

    if (password !== repassword) {
      this.setRegisterErrorMessage('Las contraseñas no coinciden.');
      return;
    } else {
      this.setRegisterErrorMessage(' ');
      const response = this.userService.register({
        userName: userName,
        password: password,
        email: email,
        isOwner: isOwner,
      });
      if (response.success) {
        this.router.navigateByUrl('/home');
      } else {
        this.setRegisterErrorMessage('El usuario ya existe.');
        return;
      }
    }
  }
}
