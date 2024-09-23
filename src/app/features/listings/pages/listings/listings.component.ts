import { Component } from '@angular/core';
import { ListingsService } from '../../services/listings.service';
import { v4 as uuidv4 } from 'uuid';

@Component({
  selector: 'app-listings',
  standalone: true,
  imports: [],
  templateUrl: './listings.component.html',
  styleUrl: './listings.component.css',
})
export class ListingsComponent {
  // TODO: Crear User service

  constructor(private listingServices: ListingsService) {}

  onUpload(event: Event) {
    const fileName = uuidv4();

    const input = event.target as HTMLInputElement;
    if (input.files!.length <= 0) {
      return;
    }

    const file: File = input.files![0];

    // TODO: Invocar el método UploadFile consultando el user que está logueado
    this.listingServices.uploadFile(file, 'usernameInventado', fileName);
  }
}
