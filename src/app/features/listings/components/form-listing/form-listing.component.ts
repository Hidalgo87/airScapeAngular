import { Component } from '@angular/core';
import { FloatLabelModule } from 'primeng/floatlabel';
import { FormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { UploadFileComponent } from '../upload-file/upload-file.component';
import { Output, EventEmitter } from '@angular/core';
import { ListingParams } from '../../interfaces/listingParams.interface';

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
  ],
  templateUrl: './form-listing.component.html',
  styleUrl: './form-listing.component.css',
})
export class FormListingComponent {
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
  error:string = '';
  @Output() newItemEvent = new EventEmitter<ListingParams>();

  newListing() {
    /*
    */
    if (!this.title || !this.description || !this.address || !this.price || !this.bedrooms || 
      !this.bathrooms || !this.guests || !this.latitude || !this.longitude ){
        this.setErrorMessage('Please fill all the fields');
        return;
    }
    
    const listingParams:ListingParams = {
      title: this.title!,
      filePhotos: [],
      description: this.description!,
      address: this.address!,
      latitude: this.latitude!,
      longitude: this.longitude!,
      pricePerNight: this.price!,
      numBedrooms: this.bedrooms!,
      numBathrooms: this.bathrooms!,
      maxGuests: this.guests!
    } 
    this.newItemEvent.emit(listingParams);
  }

  newFiles(files:File[]){

  }

  private setErrorMessage(message:string) {
    this.error = message;
  }
}
