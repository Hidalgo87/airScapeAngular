import { Component, OnInit } from '@angular/core';
import { ListingParams } from '../../interfaces/listingParams.interface';
import { FormListingComponent } from '../../components/form-listing/form-listing.component';
import { ActivatedRoute, Router } from '@angular/router';
import { ListingsService } from '../../services/listings.service';
import { Listing } from '../../interfaces/listing.interface';

@Component({
  selector: 'app-edit-listing',
  standalone: true,
  imports: [FormListingComponent],
  templateUrl: './edit-listing.component.html',
  styleUrl: './edit-listing.component.css',
})
export class EditListingComponent implements OnInit {
  listingId: string = '';
  oldListingParams: ListingParams = {
    title: '',
    photos: [],
    filePhotos: [],
    description: '',
    address: '',
    latitude: 0,
    longitude: 0,
    pricePerNight: 0,
    numBedrooms: 0,
    numBathrooms: 0,
    maxGuests: 0,
  };
  oldListing: Listing | null = {
    listingId: '',
    userName: '',
    title: '',
    photos: [],
    description: '',
    address: '',
    latitude: 0,
    longitude: 0,
    pricePerNight: 0,
    numBedrooms: 0,
    numBathrooms: 0,
    maxGuests: 0,
  };
  constructor(
    private route: ActivatedRoute,
    private listingsService: ListingsService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.listingId = this.route.snapshot.paramMap.get('id')!;
    this.oldListing = this.listingsService.getListingById(this.listingId);
    if (this.oldListing) {
      let oldListingParams: ListingParams = {
        ...this.oldListing,
        filePhotos: [],
      };
      this.oldListingParams = oldListingParams;
    }
  }

  async updateListing(listingParams: ListingParams) {
    if (this.oldListing) {
      await this.listingsService.editListing(
        {
          listingId: this.oldListing.listingId,
          userName: this.oldListing.userName,
          photos: listingParams.photos,
          title: listingParams.title,
          description: listingParams.description,
          address: listingParams.address,
          latitude: listingParams.latitude,
          longitude: listingParams.longitude,
          pricePerNight: listingParams.pricePerNight,
          numBedrooms: listingParams.numBedrooms,
          numBathrooms: listingParams.numBathrooms,
          maxGuests: listingParams.maxGuests,
        },
        listingParams.filePhotos
      );
      this.router.navigateByUrl('/my-listings');
    }
  }
}
