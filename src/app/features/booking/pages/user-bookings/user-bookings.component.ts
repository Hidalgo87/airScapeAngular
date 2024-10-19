import { Component } from '@angular/core';
import { BookingCardComponent } from '../../components/booking-card/booking-card.component';

@Component({
  selector: 'app-user-bookings',
  standalone: true,
  imports: [BookingCardComponent],
  templateUrl: './user-bookings.component.html',
  styleUrl: './user-bookings.component.css',
})
export class UserBookingsComponent {}
