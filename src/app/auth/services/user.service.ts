import { Injectable, signal } from '@angular/core';
import { UserAuth } from '../interfaces/userAuth.interfaces';
import { User } from '../../features/profile/interfaces/user.interface';
import { LoginResponse, SignUpResponse } from '../interfaces/loginResponse.interfaces';
import { v4 as uuid } from 'uuid';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  userSignal = signal<User>({
    userName: '', password: '', email: '', isOwner: false, createdAt: new Date(), updatedAt: new Date(),
    userId: '',
    profilePicture: '',
    bio: ''
  });

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
    
  register(user:UserAuth): SignUpResponse{
    if(localStorage.getItem(user.userName.toLowerCase().trim())){
      return {
        success:false,
        message:'Already exists a user with that username'
      }
    }
    const userId = uuid();
    let completeUser:User = {
      userId: userId,
      userName: user.userName,
      email: user.email!,
      password: user.password,
      profilePicture: 'https://img.freepik.com/premium-vector/stylish-default-user-profile-photo-avatar-vector-illustration_664995-352.jpg?semt=ais_hybrid',
      bio: '',
      isOwner: user.isOwner!,
      createdAt: new Date,
      updatedAt: new Date
    }
    const userSrt = JSON.stringify(completeUser);
    localStorage.setItem(user.userName.toLowerCase().trim(), userSrt);
    return{
      success: true
    }
  }

  logOut(){
    this.setUser({
      userName: '',
      password: '',
      email: '',
      isOwner: false,
      createdAt: new Date(),
      updatedAt: new Date(),
      userId: '',
      profilePicture: '',
      bio: ''
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