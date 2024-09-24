import { Injectable, signal } from '@angular/core';
import { UserAuth } from '../interfaces/userAuth.interfaces';
import { LoginResponse, SignUpResponse } from '../interfaces/login-response.interface';
@Injectable({
  providedIn: 'root'
})
export class UserService {

  userSignal = signal<UserAuth>({userName:'',password:'',email:''});

  constructor() { 

   }

  login(userName:string, password:string):LoginResponse {
      const userSrt = localStorage.getItem(userName.toLowerCase().trim())
      if(!userSrt){
        return {
          success:false,
          message:'User or password incorrects'
        }
      }
      const user:UserAuth = JSON.parse(userSrt);
      if (user.password !== password){
        return {
          success: false,
          message:'User or password incorrects'
        }
      }
      this.setUser(user);
      return {
        success:true
      }
    }  
    
  register(user:UserAuth): SignUpResponse{
    if(localStorage.getItem(user.userName.toLowerCase().trim())){
      return {
        success:false,
        message:'Already exists a user with that username'
      }
    }
    const userSrt = JSON.stringify(user);
    localStorage.setItem(user.userName.toLowerCase().trim(), userSrt);
    this.setUser(user);
    return{
      success: true
    }
  }
    
  setUser(user:UserAuth){
    localStorage.setItem('loggedUser', JSON.stringify(user))
    this.userSignal.set(user);  
  }

  getUser(){
    const userSrt = localStorage.getItem('loggedUser');
    if (userSrt){
      const user = JSON.parse(userSrt);
      this.userSignal.set(user);
    }
    return this.userSignal;
  }

}
