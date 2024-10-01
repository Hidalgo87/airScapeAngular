import { Component } from '@angular/core';
import { FormListingComponent } from '../../components/form-listing/form-listing.component';
import { ListingParams } from '../../interfaces/listingParams.interface';
import { ListingsService } from '../../services/listings.service';

@Component({
  selector: 'app-create-listing',
  standalone: true,
  imports: [FormListingComponent],
  templateUrl: './create-listing.component.html',
  styleUrl: './create-listing.component.css',
})
export class CreateListingComponent {

  constructor(private listingService:ListingsService){

  }

  async createListing(listingParams:ListingParams){
      // Ya papi, usted solo cree la listing parchado.
      let listing = await this.listingService.createListing(listingParams);
  }
}
