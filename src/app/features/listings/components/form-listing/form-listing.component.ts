import { Component, OnInit } from '@angular/core';
import { FloatLabelModule } from 'primeng/floatlabel';
import { FormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { UploadFileComponent } from '../upload-file/upload-file.component';
import { Output, Input, EventEmitter } from '@angular/core';
import { ListingParams } from '../../interfaces/listingParams.interface';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { CommonModule } from '@angular/common';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import { heroTrash } from '@ng-icons/heroicons/outline';
import { Image } from '../../../images/interfaces/image.interface';

@Component({
  selector: 'app-form-listing',
  standalone: true,
  imports: [
    FloatLabelModule,
    FormsModule,
    InputTextModule,
    InputNumberModule,
    InputTextareaModule,
    UploadFileComponent,
    ProgressSpinnerModule,
    CommonModule,
    NgIconComponent,
  ],
  providers: [provideIcons({ heroTrash })],
  templateUrl: './form-listing.component.html',
  styleUrl: './form-listing.component.css',
})
export class FormListingComponent implements OnInit {
  title: string | undefined;
  description: string | undefined;
  address: string | undefined;
  price: number | undefined;
  bedrooms: number | undefined;
  bathrooms: number | undefined;
  guests: number | undefined;
  latitude: number | undefined;
  longitude: number | undefined;
  files: File[] | undefined;
  oldFiles: Image[] | undefined;
  error: string = '';
  isLoading: boolean = false;

  ngOnInit(): void {
    this.title = this.oldListingParams.title;
    this.description = this.oldListingParams.description;
    this.address = this.oldListingParams.address;
    this.price =
      this.oldListingParams.pricePerNight === 0
        ? undefined
        : this.oldListingParams.pricePerNight;
    this.bedrooms =
      this.oldListingParams.numBedrooms === 0
        ? undefined
        : this.oldListingParams.numBedrooms;
    this.bathrooms =
      this.oldListingParams.numBathrooms === 0
        ? undefined
        : this.oldListingParams.numBathrooms;
    this.guests =
      this.oldListingParams.maxGuests === 0
        ? undefined
        : this.oldListingParams.maxGuests;
    this.latitude =
      this.oldListingParams.latitude === 0
        ? undefined
        : this.oldListingParams.latitude;
    this.longitude =
      this.oldListingParams.longitude === 0
        ? undefined
        : this.oldListingParams.longitude;
    this.oldFiles = this.oldListingParams.photos; // TODO:FILES
  }

  @Output() newItemEvent = new EventEmitter<ListingParams>();
  @Input() oldListingParams: ListingParams = {
    title: '',
    filePhotos: [], // TODO:FILES
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
  @Output() updateRequest = new EventEmitter<ListingParams>();

  async newListing() {
    /*

    */
    if (
      !this.title ||
      !this.description ||
      !this.address ||
      !this.price ||
      !this.bedrooms ||
      !this.bathrooms ||
      !this.guests ||
      !this.latitude ||
      !this.longitude ||
      this.files?.length == 0
    ) {
      await this.setErrorMessage('Please fill all the fields');
      return;
    }
    await this.setErrorMessage('');
    this.isLoading = true;
    const listingParams: ListingParams = {
      title: this.title!,
      filePhotos: this.files!,
      photos: this.oldFiles ?? [],
      description: this.description!,
      address: this.address!,
      latitude: this.latitude!,
      longitude: this.longitude!,
      pricePerNight: this.price!,
      numBedrooms: this.bedrooms!,
      numBathrooms: this.bathrooms!,
      maxGuests: this.guests!,
    };
    this.newItemEvent.emit(listingParams);
  }

  newFiles(files: File[]) {
    this.files = files;
  }

  private async setErrorMessage(message: string) {
    this.error = '';
    await this.wait(100);
    this.error = message;
  }

  private wait(ms: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  onRemoveOldFile(event: Event, index: number) {
    this.oldFiles = this.oldFiles?.filter((_, i) => i !== index);
  }
}
