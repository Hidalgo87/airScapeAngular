import { Injectable } from '@angular/core';
import { ImageService } from '../../images/services/image.service';

@Injectable({
  providedIn: 'root',
})
export class ListingsService {

  constructor(private imageService:ImageService) {

  }

  async uploadFile(file: File, userName: string, fileName: string) {
    const urlImage = await this.imageService.upload(file,userName, fileName);
    
  }
}
