import { Injectable } from '@angular/core';
import { ImageService } from '../../images/services/image.service';
import { Listing } from '../interfaces/listing.interface';
import { ListingParams } from '../interfaces/listingParams.interface';
import { ListingDetails } from '../interfaces/listingDetails.interface';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { ListingBrief } from './../interfaces/listingBrief.interface';

@Injectable({
  providedIn: 'root',
})
export class ListingsService {
  private apiUrl = environment.apiUrl;

  constructor(private imageService: ImageService, private http: HttpClient) {}

  getListingsOfCurrentUser() {
    return this.http.get<ListingBrief[]>(`${this.apiUrl}/listings/user`);
  }

  deleteListing(listingId: string) {
    return this.http.delete(`${this.apiUrl}/listings/${listingId}`);
  }

  editListing(newListing: Listing, newImages: File[] = [], listingId: string) {
    const formData = new FormData();
    formData.append('listingId', listingId);
    formData.append('title', newListing.title);
    formData.append('description', newListing.description);
    formData.append('address', newListing.address);
    formData.append('latitude', newListing.latitude.toString());
    formData.append('longitude', newListing.longitude.toString());
    formData.append('pricePerNight', newListing.pricePerNight.toString());
    formData.append('numBedrooms', newListing.numBedrooms.toString());
    formData.append('numBathrooms', newListing.numBathrooms.toString());
    formData.append('maxGuests', newListing.maxGuests.toString());
    formData.append('oldPhotos', JSON.stringify(newListing.photos));

    for (let i = 0; i < newImages.length; i++) {
      formData.append('files', newImages[i]);
    }

    return this.http.patch(`${this.apiUrl}/listings`, formData);
  }

  searchListings(
    cityName: string | undefined,
    guestsNumber: string | undefined,
    startDate: string = '',
    endDate: string = ''
  ) {
    const body = {
      cityName,
      guestsNumber: guestsNumber ? +guestsNumber : undefined,
      startDate,
      endDate,
    };

    return this.http.post<ListingBrief[]>(`${this.apiUrl}/search`, body);
  }

  async uploadFile(file: File, folderName: string, fileName: string) {
    return await this.imageService.upload(file, folderName, fileName);
  }

  getListingDetails(listingId: string) {
    return this.http.get<ListingDetails>(
      `${this.apiUrl}/listings/details/${listingId}`
    );
  }

  createListing(listingParams: ListingParams) {
    const formData = new FormData();
    formData.append('title', listingParams.title);
    formData.append('description', listingParams.description);
    formData.append('address', listingParams.address);
    formData.append('latitude', listingParams.latitude.toString());
    formData.append('longitude', listingParams.longitude.toString());
    formData.append('pricePerNight', listingParams.pricePerNight.toString());
    formData.append('numBedrooms', listingParams.numBedrooms.toString());
    formData.append('numBathrooms', listingParams.numBathrooms.toString());
    formData.append('maxGuests', listingParams.maxGuests.toString());

    for (let i = 0; i < listingParams.filePhotos.length; i++) {
      formData.append('files', listingParams.filePhotos[i]);
    }

    return this.http.post(`${this.apiUrl}/listings`, formData);
  }

  getPopularListings() {
    return this.http.get<ListingBrief[]>(`${this.apiUrl}/listings`);
  }

  getListingById(listingId: string) {
    return this.http.get<Listing>(`${this.apiUrl}/listings/raw/${listingId}`);
  }
}
