import { Component } from '@angular/core';
import { FormListingComponent } from '../../components/form-listing/form-listing.component';
import { ListingParams } from '../../interfaces/listingParams.interface';
import { ListingsService } from '../../services/listings.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-listing',
  standalone: true,
  imports: [FormListingComponent],
  templateUrl: './create-listing.component.html',
  styleUrl: './create-listing.component.css',
})
export class CreateListingComponent {
  constructor(
    private listingService: ListingsService,
    private router: Router
  ) {}

  createListing(listingParams: ListingParams) {
    this.listingService.createListing(listingParams).subscribe({
      next: () => {
        this.router.navigateByUrl('/my-listings');
      },
    });
  }
}
