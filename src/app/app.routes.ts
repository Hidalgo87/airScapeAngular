import { Routes } from '@angular/router';
import { LoginComponent } from './auth/pages/login/login.component';
import { SignUpComponent } from './auth/pages/sign-up/sign-up.component';
import { HomeComponent } from './features/home/pages/home/home.component';
import { AuthLayoutComponent } from './layout/components/auth-layout/auth-layout.component';
import { ListingsComponent } from './features/listings/pages/listings/listings.component';
import { ProfileComponent } from './features/profile/pages/profile/profile.component';
import { ListingDetailsComponent } from './features/listings/pages/listing-details/listing-details.component';
import { CreateListingComponent } from './features/listings/pages/create-listing/create-listing.component';
import { UserListingsComponent } from './features/listings/pages/user-listings/user-listings.component';

export const routes: Routes = [
  { path: '', component: HomeComponent, pathMatch: 'full' },
  { path: 'a', component: ListingsComponent },
  { path: 'profile', component: ProfileComponent },
  { path: 'listing/details/:id', component: ListingDetailsComponent },
  { path: 'listing/create', component: CreateListingComponent },
  { path: 'my-listings', component: UserListingsComponent },
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
