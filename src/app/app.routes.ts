import { Routes } from '@angular/router';
import { LoginComponent } from './auth/pages/login/login.component';
import { SignUpComponent } from './auth/pages/sign-up/sign-up.component';
import { HomeComponent } from './features/home/pages/home/home.component';
import { AuthLayoutComponent } from './layout/components/auth-layout/auth-layout.component';
import { ListingsComponent } from './features/listings/pages/listings/listings.component';
import { ProfileComponent } from './features/profile/pages/profile/profile.component';

export const routes: Routes = [
  { path: 'a', component: ListingsComponent },
  { path: 'profile', component: ProfileComponent },
  { path: '', component: HomeComponent },
  {
    path: '',
    component: AuthLayoutComponent,
    children: [
      { path: 'login', component: LoginComponent },
      { path: 'signup', component: SignUpComponent },
    ],
  },
  { path: '**', redirectTo: 'login', pathMatch: 'full' },
];
