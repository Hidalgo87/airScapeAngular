import { Injectable } from '@angular/core';
import { createClient, SupabaseClient } from '@supabase/supabase-js';

@Injectable({
  providedIn: 'root'
})
export class ImageService {
  supabase:SupabaseClient;
  constructor() { 
    this.supabase = createClient('https://poahqglqttfchvblwoav.supabase.co',
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBvYWhxZ2xxdHRmY2h2Ymx3b2F2Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTcyNjcwMTgxOCwiZXhwIjoyMDQyMjc3ODE4fQ.HTae8oq6by4C5llIBjyzGQSVX5j52vux6XbfO09rsk8')
    }

    async uploadFile(file: File, userName: string = 'juanito') {
      console.log('justo antes de entrar');
      let API = this.supabase.storage.from('airScapeBKT');
    
      console.log('se conectó al bucket');
      console.log('file', file);
    
      const { data, error } = await API.upload(`images/${userName}/${file.name}`, file);
    
      if (error) {
        console.error('Error uploading file:', error);
        return;
      }else{
        console.log('File uploaded successfully:', data);

      }
    
    }
    

}
 