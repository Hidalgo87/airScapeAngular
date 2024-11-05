import { Component, OnInit } from '@angular/core';
import { BookingCardComponent } from '../../components/booking-card/booking-card.component';
import { BookingCard } from '../../interfaces/booking-card';
import { BookingService } from '../../services/booking.service';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import { heroMagnifyingGlass } from '@ng-icons/heroicons/outline';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-user-bookings',
  standalone: true,
  imports: [BookingCardComponent, NgIconComponent, CommonModule],
  providers: [provideIcons({ heroMagnifyingGlass })],
  templateUrl: './user-bookings.component.html',
  styleUrl: './user-bookings.component.css',
})
export class UserBookingsComponent implements OnInit {
  bookings: BookingCard[] = [];

  constructor(private bookingService: BookingService) {
    // this.booking = {
    //   bookingId: 1,
    //   status: 'pending',
    //   hostName: 'Ewits',
    //   hostPicture:
    //     'https://upload.wikimedia.org/wikipedia/commons/thumb/4/48/Outdoors-man-portrait_%28cropped%29.jpg/1200px-Outdoors-man-portrait_%28cropped%29.jpg',
    //   bookedAt: new Date(2024, 8, 5),
    //   bookingStart: new Date(2024, 11, 5),
    //   bookingEnd: new Date(2024, 11, 6),
    //   price: 2000000,
    //   propertyImage:
    //     'https://definicion.de/wp-content/uploads/2011/01/casa-2.jpg',
    //   propertyTitle:
    //     'This is an awesome property with an outstanding landscape aaaaaaaaaaaaa',
    // };
  }

  ngOnInit() {
    this.bookingService.getUserBookings().subscribe({
      next: (response) => {
        this.bookings = response;
      },
    });
  }
}
