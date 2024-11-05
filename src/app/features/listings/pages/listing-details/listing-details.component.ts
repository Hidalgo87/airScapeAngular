import { Component, Input } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { GalleriaModule } from 'primeng/galleria';
import { Image } from '../../../images/interfaces/image.interface';
import { ListingsService } from '../../services/listings.service';
import { ListingDetails } from '../../interfaces/listingDetails.interface';
import { ReviewPostComponent } from '../../../review/component/review-post/review-post.component';
import { CommonModule, DatePipe, NgFor } from '@angular/common';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import { heroChatBubbleLeftRight } from '@ng-icons/heroicons/outline';
@Component({
  selector: 'app-listing-details',
  standalone: true,
  imports: [
    GalleriaModule,
    RouterLink,
    ReviewPostComponent,
    CommonModule,
    NgFor,
    NgIconComponent,
  ],
  providers: [DatePipe, provideIcons({ heroChatBubbleLeftRight })],
  templateUrl: './listing-details.component.html',
  styleUrl: './listing-details.component.css',
})
export class ListingDetailsComponent {
  // @Input()
  set listingId(listingId: string) {
    this.listingService.getListingDetails(listingId).subscribe({
      next: (response) => {
        this.listing = response;
        this.formatDates();
      },
    });
  }

  listing: ListingDetails | null = null;

  images: Image[] | undefined;

  responsiveOptions: any[] | undefined;

  createdDate: string | undefined | null;
  updatedDate: string | undefined | null;

  constructor(
    private route: ActivatedRoute,
    private listingService: ListingsService,
    private datePipe: DatePipe
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
  }

  formatDates() {
    if (this.listing?.createdAt) {
      this.createdDate = this.datePipe.transform(
        new Date(this.listing.createdAt),
        'yyyy-MM-dd'
      );
    }

    if (this.listing?.updatedAt) {
      this.updatedDate = this.datePipe.transform(
        new Date(this.listing.updatedAt),
        'yyyy-MM-dd'
      );
    }
  }
}
