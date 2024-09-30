import { Component } from '@angular/core';
import { ListingsService } from '../../services/listings.service';
import { v4 as uuidv4 } from 'uuid';
import { ListingParams } from '../../interfaces/listingParams.interface';
import { UserService } from '../../../../auth/services/user.service';
import { Listing } from '../../interfaces/listing.interface';

@Component({
  selector: 'app-listings',
  standalone: true,
  imports: [],
  templateUrl: './listings.component.html',
  styleUrl: './listings.component.css',
})
export class ListingsComponent {

  selectedsFile:File[] = [];
  constructor() {}

  async onClick(){
    if (this.selectedsFile) {
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
