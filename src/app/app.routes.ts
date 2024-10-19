import { Routes } from '@angular/router';
import { LoginComponent } from './auth/pages/login/login.component';
import { SignUpComponent } from './auth/pages/sign-up/sign-up.component';
import { HomeComponent } from './features/home/pages/home/home.component';
import { AuthLayoutComponent } from './layout/components/auth-layout/auth-layout.component';
import { ProfileComponent } from './features/profile/pages/profile/profile.component';
import { ListingDetailsComponent } from './features/listings/pages/listing-details/listing-details.component';
import { CreateListingComponent } from './features/listings/pages/create-listing/create-listing.component';
import { UserListingsComponent } from './features/listings/pages/user-listings/user-listings.component';
import { SearchComponent } from './features/search/pages/search/search.component';
import { EditListingComponent } from './features/listings/pages/edit-listing/edit-listing.component';
import { authGuard } from './auth/guards/auth.guard';
import { noAuthGuard } from './auth/guards/no-auth.guard';
import { UserBookingsComponent } from './features/booking/pages/user-bookings/user-bookings.component';

export const routes: Routes = [
  {
    path: '',
    canActivate: [authGuard],
    children: [
      { path: '', component: HomeComponent, pathMatch: 'full' },
      { path: 'profile', component: ProfileComponent },
      { path: 'listing/details/:id', component: ListingDetailsComponent },
      { path: 'listing/create', component: CreateListingComponent },
      { path: 'listing/edit/:id', component: EditListingComponent },
      { path: 'my-listings', component: UserListingsComponent },
      { path: 'search', component: SearchComponent },
      { path: 'my-bookings', component: UserBookingsComponent },
    ],
  },
  {
    path: '',
    component: AuthLayoutComponent,
    canActivate: [noAuthGuard],
    children: [
      { path: 'login', component: LoginComponent },
      { path: 'signup', component: SignUpComponent },
    ],
  },
  { path: '**', redirectTo: 'login', pathMatch: 'full' },
];
