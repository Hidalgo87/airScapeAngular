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

  constructor(
    private route: ActivatedRoute,
    private router: Router // private listingService: ListingsService
  ) {}

  ngOnInit() {
    this.route.queryParams.subscribe((params) => {
      this.filterPrice = params['price'] || null;
      this.sortOption = params['sort'] || null;

      this.applyFiltersAndSort();
    });
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
      queryParams: { sort: this.sort?.name || '' },
      queryParamsHandling: 'merge',
    });
  }
}
