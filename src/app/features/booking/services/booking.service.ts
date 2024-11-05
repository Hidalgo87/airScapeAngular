import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { BookingParams } from '../interfaces/booking-params';
import { BookingCard } from '../interfaces/booking-card';

@Injectable({
  providedIn: 'root',
})
export class BookingService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  createBooking(booking: BookingParams) {
    return this.http.post(`${this.apiUrl}/bookings`, booking);
  }

  getUserBookings() {
    return this.http.get<BookingCard[]>(`${this.apiUrl}/bookings`);
  }

  cancelBooking(bookingId: string) {
    return this.http.patch(`${this.apiUrl}/bookings`, { bookingId });
  }
}
