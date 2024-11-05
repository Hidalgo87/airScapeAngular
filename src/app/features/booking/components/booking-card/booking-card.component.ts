import { NgIconComponent, provideIcons } from '@ng-icons/core';
import { Component, Input } from '@angular/core';
import { octComment } from '@ng-icons/octicons';
import { BookingCard } from '../../interfaces/booking-card';
import { CommonModule } from '@angular/common';
import { NewReviewComponent } from '../../../review/component/new-review/new-review.component';
import { BookingService } from '../../services/booking.service';
import { ConfirmationService } from 'primeng/api';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { Router } from '@angular/router';

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
    private confirmationService: ConfirmationService,
    private router: Router
  ) {}

  ngOnInit(): void {
    if (this.booking?.bookedAt) {
      this.booking.bookedAt = new Date(this.booking?.bookedAt);
    }
    if (this.booking?.bookingStart) {
      this.booking.bookingStart = new Date(
        `${this.booking?.bookingStart}T00:00:00`
      );
    }
    if (this.booking?.bookingEnd) {
      this.booking.bookingEnd = new Date(
        `${this.booking?.bookingEnd}T00:00:00`
      );
    }
  }

  cancel() {
    this.bookingService.cancelBooking(this.booking.bookingId).subscribe({
      next: () => {
        this.router.navigate([this.router.url]).then(() => {
          window.location.reload();
        });
      },
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
