import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ListingsService } from './../../../listings/services/listings.service';
import { ListingDetails } from '../../../listings/interfaces/listingDetails.interface';
import { CalendarModule } from 'primeng/calendar';
import { FloatLabelModule } from 'primeng/floatlabel';
import { FormsModule } from '@angular/forms';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import { heroUser } from '@ng-icons/heroicons/outline';
import { InputNumberModule } from 'primeng/inputnumber';
import { BookingService } from '../../services/booking.service';
import { BookingParams } from '../../interfaces/booking-params';
import { CommonModule, DatePipe } from '@angular/common';

@Component({
  selector: 'app-new-booking',
  standalone: true,
  imports: [
    CalendarModule,
    FloatLabelModule,
    FormsModule,
    NgIconComponent,
    InputNumberModule,
    CommonModule,
  ],
  providers: [provideIcons({ heroUser }), DatePipe],
  templateUrl: './new-booking.component.html',
  styleUrl: './new-booking.component.css',
})
export class NewBookingComponent implements OnInit {
  set listingId(listingId: string) {
    this.listingService.getListingDetails(listingId).subscribe({
      next: (response) => {
        this.listing = response;
      },
    });
  }

  listing: ListingDetails | null = null;

  today = new Date();

  date: Date[] | null = null;
  guests: number | null = null;

  error = '';

  total: number | null = null;

  constructor(
    private route: ActivatedRoute,
    private listingService: ListingsService,
    private bookingService: BookingService,
    private router: Router,
    private datePipe: DatePipe
  ) {}

  ngOnInit(): void {
    this.listingId = this.route.snapshot.paramMap.get('id')!;
  }

  onConfirm() {
    this.error = '';
    if (!this.date || !this.guests) {
      this.error = 'Please fill all the fields';
      return;
    }

    const booking: BookingParams = {
      listingId: this.listing?.listing_id!,
      startDate: this.datePipe.transform(this.date![0], 'yyyy-MM-dd')!,
      endDate: this.datePipe.transform(this.date![1], 'yyyy-MM-dd')!,
    };

    this.bookingService.createBooking(booking).subscribe({
      next: () => {
        this.router.navigate(['/my-bookings']);
      },

      error: (error) => {
        this.error = error.message;
      },
    });
  }

  onClose() {
    if (this.date && this.date[1] === null) {
      this.date = null;
      return;
    }
    this.calculatePrice();
  }

  calculatePrice() {
    const days = this.daysBetween(this.date![0], this.date![1]);
    this.total = days * this.listing!.pricePerNight;
  }

  daysBetween(date1: string | Date, date2: string | Date): number {
    const start = new Date(date1);
    const end = new Date(date2);

    const diffInMs = Math.abs(end.getTime() - start.getTime());

    return Math.ceil(diffInMs / (1000 * 60 * 60 * 24));
  }
}
