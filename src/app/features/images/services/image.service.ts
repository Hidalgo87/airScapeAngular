import { Injectable } from '@angular/core';
import { createClient, SupabaseClient } from '@supabase/supabase-js';

@Injectable({
  providedIn: 'root'
})
export class ImageService {

  private supabase: SupabaseClient;

  constructor() { 
    this.supabase = createClient('https://poahqglqttfchvblwoav.supabase.co',
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBvYWhxZ2xxdHRmY2h2Ymx3b2F2Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTcyNjcwMTgxOCwiZXhwIjoyMDQyMjc3ODE4fQ.HTae8oq6by4C5llIBjyzGQSVX5j52vux6XbfO09rsk8'
    )
   }

   async upload(file:File, fileName:string, folderName:string='base'){
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
