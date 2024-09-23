import { Component } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { UserAuth } from '../../interfaces/userAuth.interfaces';



@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  user:UserAuth = {
    userName:'',
    password:''
  };

  loginForm = this.fb.group({
    userName:[''],
    password:['']
  });

  loginErrorMessage: string = '';

  constructor(private fb:FormBuilder, private router:Router){
    
  };

  setLoginErrorMessage(message : string) {
    this.loginErrorMessage = message;
  }

  onLogin() {
    let userName = this.loginForm.value.userName;
    let password = this.loginForm.value.password;
    localStorage.setItem("juanfernando","123")
    if (!userName || !password){
      this.setLoginErrorMessage("Diligenciar los campos");
      return;
    }

    if(userName.length < 8 || userName.length >15){
      this.setLoginErrorMessage("El nombre de usuario debe tener entre 8 y 15 caracteres.");
      return;
    } else if (/\s/.test(userName)) {
      this.setLoginErrorMessage('El nombre de usuario no puede contener espacios.');
      return;
    } else if (!/^[A-Za-z]/.test(userName)) {
      this.setLoginErrorMessage('El nombre de usuario debe comenzar con una letra.');
      return;
    } else {
      this.setLoginErrorMessage('');
    }

    const storedPassword = localStorage.getItem(userName.toLowerCase());

    if (storedPassword ===null) {
      this.setLoginErrorMessage("Usuario no registrado")
    }else if (storedPassword === password) {
      this.setLoginErrorMessage("Exitoso");
      this.router.navigateByUrl("/home")
    } else {
      this.setLoginErrorMessage("Contraseña Incorrecta");
    }
  };
}
