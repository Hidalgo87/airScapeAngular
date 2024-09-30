import { Component, OnInit } from '@angular/core';
import { octPencil } from '@ng-icons/octicons';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import { ProfileService } from '../../services/profile.service';
import { ProfileEditParams } from '../../interfaces/profileEditParams.interface';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [NgIconComponent, ReactiveFormsModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css',
  providers: [provideIcons({ octPencil })],
})
/*
En NgOnInit me traigo la informacion del usuario actual.
Cuando le de al botón save changes, me traigo los valores del form y llamo al servicio.
*/
export class ProfileComponent implements OnInit{
  user:any;

  updateProfileForm = this.fb.group({
    email:['', Validators.required],
    bio:['', Validators.required],
    password:['', Validators.required]
  });
  
  constructor(private profileService:ProfileService, private fb:FormBuilder){

  }
  
  ngOnInit(): void {
    this.user = this.profileService.getCurrentProfile();
    this.updateProfileForm.setValue({
      email: this.user().email,
      bio: this.user().bio,
      password: this.user().password
    });
  }

  onSaveChanges(){
    if (!this.updateProfileForm.valid){
      alert('Porfavor diligencia todos los campos');
      //TODO: Poner mensaje de alerta llenar formulario
      return;
    }
    const profileEditParams:ProfileEditParams = {
      email: this.updateProfileForm.value.email!,
      password: this.updateProfileForm.value.password!,
      bio: this.updateProfileForm.value.bio!
    };
    this.profileService.editProfile(profileEditParams);
  }

  onFileSelected(event:Event){
    const input = event.target as HTMLInputElement;
    if (input.files){
      const file = input.files[0];
      this.profileService.changeProfilePhoto(file);
    }
  }
}
