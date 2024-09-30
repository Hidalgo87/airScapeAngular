import { Injectable } from '@angular/core';
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { environment } from '../../../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class ImageService {

  private supabase: SupabaseClient;

  constructor() { 
    this.supabase = createClient(environment.supabaseConfig.url,
      environment.supabaseConfig.apikey
    )
   }

   async upload(file:File, folderName:string, fileName:string){
    const { error } = await this.supabase
    .storage
    .from('airScapeBKT')
    .upload(`${folderName}/${fileName}`, file);
    if (error){
      alert(error.message);
      return;
    }
    const { data } = await this.supabase
    .storage
    .from('airScapeBKT')
    .getPublicUrl(`${folderName}/${fileName}`)
    return data.publicUrl;
   }
}
