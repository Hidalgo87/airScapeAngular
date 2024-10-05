import { Component, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GalleriaModule } from 'primeng/galleria';
import { Image } from '../../../images/interfaces/image.interface';
import { ListingsService } from '../../services/listings.service';
import { ListingDetails } from '../../interfaces/listingDetails.interface';
@Component({
  selector: 'app-listing-details',
  standalone: true,
  imports: [GalleriaModule],
  templateUrl: './listing-details.component.html',
  styleUrl: './listing-details.component.css',
})
export class ListingDetailsComponent {
  // @Input()
  set listingId(listingId: string) {
    this.listing = this.listingService.getListingDetails(listingId);
  }

  listing: ListingDetails | null = null;

  images: Image[] | undefined;

  responsiveOptions: any[] | undefined;

  constructor(
    private route: ActivatedRoute,
    private listingService: ListingsService
  ) {}
  ngOnInit(): void {
    this.listingId = this.route.snapshot.paramMap.get('id')!;
    this.images = [];

    // Some PrimeNG settings
    this.responsiveOptions = [
      {
        breakpoint: '1024px',
        numVisible: 5,
      },
      {
        breakpoint: '768px',
        numVisible: 3,
      },
      {
        breakpoint: '560px',
        numVisible: 1,
      },
    ];

    if (this.listing?.createdAt) {
      this.listing.createdAt = new Date(this.listing.createdAt);
    }

    if (this.listing?.updatedAt) {
      this.listing.updatedAt = new Date(this.listing.updatedAt);
    }
  }
}
