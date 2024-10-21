import { NgIconComponent, provideIcons } from '@ng-icons/core';
import { Component, Input } from '@angular/core';
import { octComment } from '@ng-icons/octicons';
import { BookingCard } from '../../interfaces/booking-card';

@Component({
  selector: 'app-booking-card',
  standalone: true,
  imports: [NgIconComponent],
  providers: [provideIcons({ octComment })],
  templateUrl: './booking-card.component.html',
  styleUrl: './booking-card.component.css',
})
export class BookingCardComponent {
  @Input() booking!: BookingCard;

  ngOnInit(): void {
    if (this.booking?.bookedAt) {
      this.booking.bookedAt = new Date(this.booking?.bookedAt);
    }
    if (this.booking?.bookingStart) {
      this.booking.bookingStart = new Date(this.booking?.bookingStart);
    }
    if (this.booking?.bookingEnd) {
      this.booking.bookingEnd = new Date(this.booking?.bookingEnd);
    }
  }
}
