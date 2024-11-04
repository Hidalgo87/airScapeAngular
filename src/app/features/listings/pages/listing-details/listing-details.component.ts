import { Component, Input } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { GalleriaModule } from 'primeng/galleria';
import { Image } from '../../../images/interfaces/image.interface';
import { ListingsService } from '../../services/listings.service';
import { ListingDetails } from '../../interfaces/listingDetails.interface';
import { ReviewPostComponent } from '../../../review/component/review-post/review-post.component';
import { CommonModule, NgFor } from '@angular/common';
@Component({
  selector: 'app-listing-details',
  standalone: true,
  imports: [
    GalleriaModule,
    RouterLink,
    ReviewPostComponent,
    CommonModule,
    NgFor,
  ],
  templateUrl: './listing-details.component.html',
  styleUrl: './listing-details.component.css',
})
export class ListingDetailsComponent {
  // @Input()
  set listingId(listingId: string) {
    this.listingService.getListingDetails(listingId).subscribe({
      next: (response) => {
        this.listing = response;
      },
    });
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
