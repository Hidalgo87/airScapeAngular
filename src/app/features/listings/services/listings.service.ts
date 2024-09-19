import { Injectable } from '@angular/core';
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ListingsService {
  supabase: SupabaseClient;

  constructor() {
    this.supabase = createClient(
      environment.supabaseConfig.url,
      environment.supabaseConfig.apikey
    );
  }

  // Upload file using standard upload
  async uploadFile(file: File, userName: string, fileName: string) {
    const { data, error } = await this.supabase.storage
      .from('listing_photos')
      .upload(`${userName}/${fileName}`, file);
    if (error) {
      // Handle error
    } else {
      // Handle success
    }

    // Obtener url de la imagen
    const resp = await this.supabase.storage
      .from('listing_photos')
      .getPublicUrl(`${userName}/${fileName}`);
  }
}
