import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ListingsService } from './../../../listings/services/listings.service';
import { ListingDetails } from '../../../listings/interfaces/listingDetails.interface';
import { CalendarModule } from 'primeng/calendar';
import { FloatLabelModule } from 'primeng/floatlabel';
import { FormsModule } from '@angular/forms';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import { heroUser } from '@ng-icons/heroicons/outline';
import { InputNumberModule } from 'primeng/inputnumber';

@Component({
  selector: 'app-new-booking',
  standalone: true,
  imports: [
    CalendarModule,
    FloatLabelModule,
    FormsModule,
    NgIconComponent,
    InputNumberModule,
  ],
  providers: [provideIcons({ heroUser })],
  templateUrl: './new-booking.component.html',
  styleUrl: './new-booking.component.css',
})
export class NewBookingComponent implements OnInit {
  set listingId(listingId: string) {
    this.listing = this.listingService.getListingDetails(listingId);
  }

  // TODO No need to have all the details, just the data from the card
  listing: ListingDetails | null = null;

  today = new Date();

  date: Date | null = null;
  guests: number | null = null;

  constructor(
    private route: ActivatedRoute,
    private listingService: ListingsService
  ) {}
  ngOnInit(): void {
    this.listingId = this.route.snapshot.paramMap.get('id')!;
  }
}
