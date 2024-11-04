import { Injectable, WritableSignal } from '@angular/core';
import { UserService } from '../../../auth/services/user.service';
import { ProfileEditParams } from '../interfaces/profileEditParams.interface';
import { User } from '../interfaces/user.interface';
import { ImageService } from '../../images/services/image.service';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ProfileService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  editProfile(profileEditParams: ProfileEditParams, newPicture: File) {
    const formData = new FormData();
    formData.append('file', newPicture);
    formData.append('bio', profileEditParams.bio);
    formData.append('email', profileEditParams.email);
    formData.append('password', profileEditParams.password);

    return this.http.patch<void>(`${this.apiUrl}/profile`, formData);
  }
}
