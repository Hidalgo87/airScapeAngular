import { Component, OnInit } from '@angular/core';
import { octPencil } from '@ng-icons/octicons';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import { ProfileService } from '../../services/profile.service';
import { ProfileEditParams } from '../../interfaces/profileEditParams.interface';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [
    NgIconComponent,
    ReactiveFormsModule,
    ProgressSpinnerModule,
    CommonModule,
  ],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css',
  providers: [provideIcons({ octPencil })],
})
/*
En NgOnInit me traigo la información del usuario actual.
Cuando le de al botón save changes, me traigo los valores del form y llamo al servicio.
*/
export class ProfileComponent implements OnInit {
  user: any;
  error: string = '';
  updateProfileForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    bio: ['', Validators.required],
    password: ['', Validators.required],
  });

  isPictureLoading: boolean = false;

  constructor(
    private profileService: ProfileService,
    private fb: FormBuilder,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.user = this.profileService.getCurrentProfile();
    this.updateProfileForm.setValue({
      email: this.user().email,
      bio: this.user().bio,
      password: this.user().password,
    });
  }

  onSaveChanges() {
    if (!this.updateProfileForm.valid) {
      alert('Por favor diligencia todos los campos');
      //TODO: Poner mensaje de alerta llenar formulario
      return;
    }
    const password = this.updateProfileForm.value.password!;
    if (password.length < 12 || password.length > 20) {
      this.setErrorMessage(
        'La contraseña debe tener entre 12 y 20 caracteres.'
      );
      return;
    } else if (!/[A-Z]/.test(password)) {
      this.setErrorMessage(
        'La contraseña debe incluir al menos una letra en mayúsculas.'
      );
      return;
    } else if (!/[a-z]/.test(password)) {
      this.setErrorMessage(
        'La contraseña debe incluir al menos una letra en minúsculas.'
      );
      return;
    } else if (!/\d/.test(password)) {
      this.setErrorMessage('La contraseña debe incluir al menos un número.');
      return;
    } else if (!/[-!@#$%^&*(),.?":{}|<>]/.test(password)) {
      this.setErrorMessage(
        'La contraseña debe incluir al menos un carácter especial.'
      );
      return;
    }
    const profileEditParams: ProfileEditParams = {
      email: this.updateProfileForm.value.email!,
      password: this.updateProfileForm.value.password!,
      bio: this.updateProfileForm.value.bio!,
    };
    this.setErrorMessage('');
    this.profileService.editProfile(profileEditParams);
    this.router.navigateByUrl('/');
  }

  async onFileSelected(event: Event) {
    this.isPictureLoading = true;
    const input = event.target as HTMLInputElement;
    if (input.files) {
      const file = input.files[0];
      await this.profileService.changeProfilePhoto(file);
      this.isPictureLoading = false;
    }
  }

  private async setErrorMessage(message: string) {
    this.error = '';
    await this.wait(100);
    this.error = message;
  }

  private wait(ms: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }
}
