import { Injectable, signal } from '@angular/core';
import { LoginResponse, SignUpResponse } from '../interfaces/login-response.interface';
import UUID from 'uuid-int';
import { User } from '../../features/profile/interfaces/user';
import { UserAuth } from '../interfaces/userAuth.interfaces';
@Injectable({
  providedIn: 'root'
})
export class UserService {

  userSignal = signal<User>({userName:'',password:'',email:'', isOwner:true, createdAt:new Date(), updatedAt:new Date()});

  constructor() { 

   }

  login(userAuth:UserAuth):LoginResponse {
      const userSrt = localStorage.getItem(userAuth.userName.toLowerCase().trim())
      if(!userSrt){
        return {
          success:false,
          message:'User or password incorrects'
        }
      }
      const user:User = JSON.parse(userSrt);
      if (user.password !== userAuth.password){
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
    
  register(user:User): SignUpResponse{
    if(localStorage.getItem(user.userName.toLowerCase().trim())){
      return {
        success:false,
        message:'Already exists a user with that username'
      }
    }
    const idNumber = UUID(0).uuid();
    user.userId = idNumber;
    const userSrt = JSON.stringify(user);
    localStorage.setItem(user.userName.toLowerCase().trim(), userSrt);
    this.setUser(user);
    return{
      success: true
    }
  }

  logOut(){
    this.setUser({
      userName:'',
      password:'', 
      email:'',
      isOwner:true,
      createdAt:new Date(),
      updatedAt:new Date() 
      })
  }
    
  setUser(user:User){
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
