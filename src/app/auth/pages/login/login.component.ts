import { Component } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { UserService } from '../../services/user.service';



@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  loginForm = this.fb.group({
    userName:['', Validators.required],
    password:['', Validators.required]
  });

  loginErrorMessage: string = '';

  constructor(private fb:FormBuilder, private router:Router, private userService:UserService){
    
  };

  setLoginErrorMessage(message : string) {
    this.loginErrorMessage = message;
  }

  onLogin() {
    if (!this.loginForm.valid){
      this.setLoginErrorMessage("Diligenciar los campos");
      return;
    }
    let userName = this.loginForm.value.userName!;
    let password = this.loginForm.value.password!;

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
    let response = this.userService.login({userName:userName,password:password});
    

    if (response.success) {
      this.setLoginErrorMessage("Exitoso");
      let user = this.userService.getUser();
      this.router.navigateByUrl("/")
    } else {
      this.setLoginErrorMessage("Usuario no registrado")
    }
  };
}
