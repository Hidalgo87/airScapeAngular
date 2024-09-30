import { Injectable } from '@angular/core';
import { UserService } from '../../../auth/services/user.service';
import { ProfileEditParams } from '../interfaces/profileEditParams.interface';
import { User } from '../interfaces/user.interface';
import { ImageService } from '../../images/services/image.service';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {
  user;
  constructor(private userService:UserService, private imageService:ImageService) {
    this.user = this.userService.getUser();
   }

  getCurrentProfile():User|null{
    const userName = this.user().userName;
    const userSrt = localStorage.getItem(userName.toLowerCase().trim());
    if (userSrt){
      const user:User = JSON.parse(userSrt);
      return user;
    }else{
      return null;
    }
  }

  editProfile(profileEditParams:ProfileEditParams){
    const userName = this.user().userName;
    const userSrt = localStorage.getItem(userName.toLowerCase().trim());
    if (userSrt){
      const user:User = JSON.parse(userSrt);
      user.bio = profileEditParams.bio;
      user.email = profileEditParams.email;
      user.password = profileEditParams.password;
      const newUserStr = JSON.stringify(user);
      localStorage.setItem(userName.toLowerCase().trim(), newUserStr);
    } else {
      console.error('No se encontró un usuario en la sesión actual', )
    }
  }

  async changeProfilePhoto(fileNewPhoto:File):Promise<string|null>{
    const userName = this.user().userName;
    const userSrt = localStorage.getItem(userName.toLowerCase().trim());
    if (userSrt){
      const user:User = JSON.parse(userSrt);
      const imageUrl = await this.imageService.updateProfilePhoto(fileNewPhoto,user.userId);
      if (imageUrl){
        user.profilePicture = imageUrl;
        const newUserStr = JSON.stringify(user);
        localStorage.setItem(userName.toLowerCase().trim(), newUserStr);
        return imageUrl;
      } else {
        console.error('No se pudo subir la foto de perfil', );
      }
    } else {
      console.error('No se encontró un usuario en la sesión actual', );
    }
    return null;
  }
}
