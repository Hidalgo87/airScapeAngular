import { Component, OnInit } from '@angular/core';
import { SearchBarComponent } from '../../../search/components/search-bar/search-bar.component';
import { ListingCardComponent } from '../../../listings/components/listing-card/listing-card.component';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import { octNorthStar } from '@ng-icons/octicons';
import { ListingsService } from '../../../listings/services/listings.service';
import { ListingBrief } from '../../../listings/interfaces/listingBrief.interface';
import { CommonModule } from '@angular/common';
import { ListingCardSkeletonComponent } from '../../../listings/components/listing-card-skeleton/listing-card-skeleton.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    SearchBarComponent,
    ListingCardComponent,
    NgIconComponent,
    CommonModule,
    ListingCardSkeletonComponent,
  ],
  providers: [provideIcons({ octNorthStar })],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent implements OnInit {
  listings: ListingBrief[] = [];

  constructor(private listingService: ListingsService) {}

  ngOnInit(): void {
    this.listings = this.listingService.getPopularListings();
  }
}
