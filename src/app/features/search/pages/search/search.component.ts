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
  providers: [provideIcons({ octFilter, octSortDesc, octCheck })],
  templateUrl: './search.component.html',
  styleUrl: './search.component.css',
})
export class SearchComponent implements OnInit {
  price: number | undefined;
  sort: Option | undefined;

  filterPrice: number | undefined;
  sortOption: string | undefined;

  sortOptions: Option[] = [{ name: 'Price' }, { name: 'Most recent' }];

  city: string | undefined;
  guests: number | undefined;

  listingResults: ListingBrief[];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private listingService: ListingsService
  ) {
    this.listingResults = [];
  }

  ngOnInit() {
    this.route.queryParams.subscribe((params) => {
      this.filterPrice = params['price'] || null;
      this.sortOption = params['sort'] || null;
      this.city = params['city'] || null;
      this.guests = params['guests'] || null;

      this.callResults();

      this.applyFiltersAndSort();
    });
  }

  async callResults() {
    this.listingResults = await this.listingService.searchListings(
      this.city ?? '',
      this.guests ?? 0
    );
    console.log(this.listingResults);
  }

  applyFiltersAndSort(): void {
    console.log(`Filter: ${this.filterPrice}, Sort: ${this.sortOption}`);
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
