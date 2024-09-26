import { Injectable } from '@angular/core';
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { environment } from '../../../../environments/environment';
import { v4 as uuidv4 } from 'uuid';

@Injectable({
  providedIn: 'root'
})
export class ImageService {
  
  supabase:SupabaseClient;
  constructor() { 
    console.log('', environment.supabaseConfig.apiUrl)
    console.log('', environment.supabaseConfig.apiKey)
    this.supabase = createClient(environment.supabaseConfig.apiUrl,environment.supabaseConfig.apiKey);
  }

  async uploadImage(file: File):Promise<{id:string,path:string,fullPath:string}| null> {
    const id = uuidv4();
    const {data, error} = await this.supabase.storage.from('airScapeBKT').upload(`${id}`, file)
    
    if (error) {
      console.log('error', error)
      return null;
    } else {
      console.log('id', data.id);
      console.log('path', data.path);
      console.log('fullPath', data.fullPath)
      return data
    }
  }
}
