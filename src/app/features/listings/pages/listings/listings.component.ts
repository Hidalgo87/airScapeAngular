import { Component } from '@angular/core';
import { ListingsService } from '../../services/listings.service';
import { v4 as uuidv4 } from 'uuid';
import { ListingParams } from '../../interfaces/listingParams.interface';
import { UserService } from '../../../../auth/services/user.service';
import { Listing } from '../../interfaces/listing.interface';
import { ProfileService } from '../../../profile/services/profile.service';
import { ProfileEditParams } from '../../../profile/interfaces/profileEditParams.interface';

@Component({
  selector: 'app-listings',
  standalone: true,
  imports: [],
  templateUrl: './listings.component.html',
  styleUrl: './listings.component.css',
})
export class ListingsComponent {
  // TODO ESTO ES PARA PROPÓSITOS DE TESTING, SI DESEA BORRAR, HÁGALO
  selectedsFile:File[] = [];
  constructor(private profileService:ProfileService) {}

  async onClick(){
    if (this.selectedsFile) {
      const response = await this.profileService.changeProfilePhoto(this.selectedsFile[0]);
      console.log('response', response);
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
