import { Component } from '@angular/core';
import { ListingsService } from '../../services/listings.service';
import { v4 as uuidv4 } from 'uuid';
import { ListingParams } from '../../interfaces/listingParams.interface';
import { UserService } from '../../../../auth/services/user.service';

@Component({
  selector: 'app-listings',
  standalone: true,
  imports: [],
  templateUrl: './listings.component.html',
  styleUrl: './listings.component.css',
})
export class ListingsComponent {

  selectedsFile:File[] = [];
  constructor(private listingServices: ListingsService, private userService:UserService) {}

  onClick(){
    if (this.selectedsFile) {
      const user = this.userService.getUser()();
      const listingParams:ListingParams = {
        title: 'Camping House',
        userName: user.userName,
        filePhotos: this.selectedsFile,
        description: 'Really nice ambient',
        address: 'Cl. 25 #89-45',
        latitude: 0,
        longitude: 0,
        pricePerNight: 110000,
        numBedrooms: 4,
        numBathrooms: 2,
        maxGuests: 4
      }
      this.listingServices.createListing(listingParams);
    } else {
      console.log('No se ha seleccionado ningún archivo.');
    }
  }

  onUpload(event: Event) {
    const input = event.target as HTMLInputElement; // Obtener el input
    if (input.files && input.files.length > 0) {
      this.selectedsFile.push(input.files[0]); // Almacenar el primer archivo seleccionado
      console.log('Archivos seleccionados:', this.selectedsFile);
    }
  }
}
