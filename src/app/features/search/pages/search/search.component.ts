import { Component, OnInit } from '@angular/core';
import { SearchBarComponent } from '../../components/search-bar/search-bar.component';
import { SliderModule } from 'primeng/slider';
import { FormsModule } from '@angular/forms';
import { InputNumberModule } from 'primeng/inputnumber';
import { DropdownModule } from 'primeng/dropdown';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import { octCheck, octFilter, octSortDesc } from '@ng-icons/octicons';
import { ListingCardComponent } from '../../../listings/components/listing-card/listing-card.component';
import { ActivatedRoute, Router } from '@angular/router';
import { ListingsService } from '../../../listings/services/listings.service';
import { ListingBrief } from '../../../listings/interfaces/listingBrief.interface';
import { CommonModule } from '@angular/common';
import { heroMagnifyingGlass } from '@ng-icons/heroicons/outline';

interface Option {
  name: string;
}

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [
    SearchBarComponent,
    SliderModule,
    FormsModule,
    InputNumberModule,
    DropdownModule,
    NgIconComponent,
    ListingCardComponent,
    CommonModule,
  ],
  providers: [
    provideIcons({
      octFilter,
      octSortDesc,
      octCheck,
      heroMagnifyingGlass,
    }),
  ],
  templateUrl: './search.component.html',
  styleUrl: './search.component.css',
})
export class SearchComponent implements OnInit {
  price: number | undefined;
  sort: Option | undefined;

  filterPrice: number | undefined;
  sortOption: string | undefined;

  sortOptions: Option[] = [
    { name: 'Price' },
    { name: 'Latest' },
    { name: 'Oldest' },
  ];

  city: string | undefined;
  guests: number | undefined;
  startDate: Date | undefined;
  endDate: Date | undefined;

  listingResults: ListingBrief[];
  displayedListings: ListingBrief[];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private listingService: ListingsService
  ) {
    this.listingResults = [];
    this.displayedListings = [];
  }

  ngOnInit() {
    this.route.queryParams.subscribe((params) => {
      this.filterPrice = params['price'] || null;
      this.sortOption = params['sort'] || null;
      this.city = params['city'] || null;
      this.guests = params['guests'] || null;
      this.startDate = params['start-date'] || null;
      this.endDate = params['end-date'] || null;

      this.callResults();
    });
  }

  async callResults() {
    this.listingService.searchListings(this.city, this.guests).subscribe({
      next: (response) => {
        this.listingResults = response;
        this.applyFiltersAndSort();
      },
    });
  }

  applyFiltersAndSort(): void {
    this.displayedListings = this.listingResults;

    // Filtering
    if (this.price) {
      this.displayedListings = this.displayedListings.filter(
        (listing) => listing.pricePerNight < this.price!
      );
    }

    // Sorting
    if (this.sortOption === 'Price') {
      this.displayedListings = this.displayedListings.sort(
        (listing1, listing2) => listing1.pricePerNight - listing2.pricePerNight
      );
    } else if (this.sortOption === 'Latest') {
      this.displayedListings = this.displayedListings.sort(
        (listing1, listing2) =>
          new Date(listing2.createdAt).getTime() -
          new Date(listing1.createdAt).getTime()
      );
    } else if (this.sortOption === 'Oldest') {
      this.displayedListings = this.displayedListings.sort(
        (listing1, listing2) =>
          new Date(listing1.createdAt).getTime() -
          new Date(listing2.createdAt).getTime()
      );
    }
  }

  onFilterChange(): void {
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: { price: this.price },
      queryParamsHandling: 'merge',
    });
  }

  onSortChange(): void {
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: { sort: this.sort?.name || undefined },
      queryParamsHandling: 'merge',
    });
  }
}
