import { Injectable } from '@angular/core';
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { environment } from '../../../../environments/environment';
import { ImageService } from '../../images/services/image.service';

@Injectable({
  providedIn: 'root',
})
export class ListingsService {

  constructor(private imageService:ImageService) {

  }

  // Upload file using standard upload
  async uploadFile(file: File, userName: string, fileName: string) {
    const data = await this.imageService.upload(file,userName, fileName);
    console.log('data', data);
  }
}
