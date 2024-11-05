import { Component, OnInit } from '@angular/core';
import { octPencil } from '@ng-icons/octicons';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import { ProfileService } from '../../services/profile.service';
import { ProfileEditParams } from '../../interfaces/profileEditParams.interface';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { UserService } from '../../../../auth/services/user.service';
import { User } from '../../interfaces/user.interface';

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
  user: User;
  error: string = '';
  updateProfileForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    bio: [''],
    password: [''],
  });

  isPictureLoading: boolean = false;

  constructor(
    private profileService: ProfileService,
    private fb: FormBuilder,
    private router: Router,
    private userService: UserService
  ) {
    this.user = this.userService.getUser()!;
  }

  ngOnInit(): void {
    this.updateProfileForm.setValue({
      email: this.user.email,
      bio: this.user.bio,
      password: '',
    });
  }

  onSaveChanges() {
    if (!this.updateProfileForm.valid) {
      this.setErrorMessage('Please enter a valid email.');
      return;
    }
    const password = this.updateProfileForm.value.password!;

    if (password.length > 0 && !this.isPasswordValid(password)) {
      return;
    }

    this.setErrorMessage('');
    const profileEditParams: ProfileEditParams = {
      email: this.updateProfileForm.value.email!,
      password: this.updateProfileForm.value.password!,
      bio: this.updateProfileForm.value.bio!,
    };

    this.profileService.editProfile(profileEditParams).subscribe({
      next: () => {
        this.router.navigateByUrl('/');
      },
      error: (error) => {
        this.setErrorMessage(error.message);
      },
    });
  }

  onFileSelected(event: Event) {
    this.isPictureLoading = true;
    const input = event.target as HTMLInputElement;
    if (input.files) {
      const file = input.files[0];
      this.profileService.editPicture(file).subscribe({
        next: () => {
          this.isPictureLoading = false;
          this.user = this.userService.getUser()!;
        },
      });
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

  private isPasswordValid(password: string): boolean {
    if (password.length < 12 || password.length > 20) {
      this.setErrorMessage(
        'The password must be between 12 and 20 characters.'
      );
    } else if (!/[A-Z]/.test(password)) {
      this.setErrorMessage(
        'The password must include at least one uppercase letter.'
      );
    } else if (!/[a-z]/.test(password)) {
      this.setErrorMessage(
        'The password must include at least one lowercase letter.'
      );
    } else if (!/\d/.test(password)) {
      this.setErrorMessage('The password must include at least one number.');
    } else if (!/[-!@#$%^&*(),.?":{}|<>]/.test(password)) {
      this.setErrorMessage(
        'The password must include at least one special character.'
      );
    } else {
      return true;
    }
    return false;
  }
}
