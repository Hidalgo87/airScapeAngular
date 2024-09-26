import { Injectable } from '@angular/core';
import { UserService } from '../../../auth/services/user.service';
@Injectable({
  providedIn: 'root'
})
export class ProfileService {
  user;
  constructor(private userService:UserService) { 
    this.user = userService.getUser();
   }

  editBio(newBio:string){
    const newUser = this.user();
    newUser.bio = newBio;
    this.userService.setUser(newUser);
  }

  editEmail(newEmail:string){
    const newUser = this.user();
    newUser.email = newEmail;
    this.userService.setUser(newUser);
  }

  editPassword(newPassword:string){
    const newUser = this.user();
    newUser.password = newPassword;
    this.userService.setUser(newUser);
  }
  // TODO: This works differente because you have to upload to supabase first and then link the url 
  editPhoto(newPhoto:string){
    const newUser = this.user();
    newUser.profilePicture = newPhoto;
    this.userService.setUser(newUser);
  }
  
}
