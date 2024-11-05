import { NgIconComponent, provideIcons } from '@ng-icons/core';
import { Component, Input } from '@angular/core';
import { octComment } from '@ng-icons/octicons';
import { BookingCard } from '../../interfaces/booking-card';
import { CommonModule } from '@angular/common';
import { NewReviewComponent } from '../../../review/component/new-review/new-review.component';
import { BookingService } from '../../services/booking.service';
import { ConfirmationService } from 'primeng/api';
import { ConfirmDialogModule } from 'primeng/confirmdialog';

@Component({
  selector: 'app-booking-card',
  standalone: true,
  imports: [
    NgIconComponent,
    CommonModule,
    NewReviewComponent,
    ConfirmDialogModule,
  ],
  providers: [provideIcons({ octComment }), ConfirmationService],
  templateUrl: './booking-card.component.html',
  styleUrl: './booking-card.component.css',
})
export class BookingCardComponent {
  @Input() booking!: BookingCard;

  constructor(
    private bookingService: BookingService,
    private confirmationService: ConfirmationService
  ) {}

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

  cancel() {
    this.bookingService.cancelBooking(this.booking.bookingId).subscribe({
      next: () => {},
    });
  }

  onCancel(event: Event) {
    this.confirmationService.confirm({
      target: event.target as EventTarget,
      message: 'Are you sure that you want to proceed?',
      header: 'Confirmation',
      icon: 'pi pi-exclamation-triangle',
      acceptIcon: 'none',
      rejectIcon: 'none',
      rejectButtonStyleClass: 'p-button-text',
      accept: () => {
        this.cancel();
        // this.messageService.add({
        //   severity: 'info',
        //   summary: 'Confirmed',
        //   detail: 'You have accepted',
        // });
      },
    });
  }
}
