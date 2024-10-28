import { Injectable } from '@angular/core';
import { burnedListing, users } from '../burnedListings/burnedListing';

@Injectable({
  providedIn: 'root',
})
export class BurnedListingService {
  setBurnedListings() {
    const response = localStorage.getItem('listings');
    if (!response) {
      for (let burnedUser of users) {
        localStorage.setItem(
          burnedUser.userName,
          JSON.stringify(burnedUser.user)
        );
      }
      localStorage.setItem('listings', JSON.stringify(burnedListing));
    }
  }
}
