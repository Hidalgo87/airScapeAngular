import { Component } from '@angular/core';
import { ImageService } from '../../features/images/services/image.service';

@Component({
  selector: 'app-testing',
  standalone: true,
  imports: [],
  templateUrl: './testing.component.html',
  styleUrl: './testing.component.css'
})
export class TestingComponent {

  constructor(private imageService:ImageService){

  }

   onUpload(event:Event){
      const input = event.target as HTMLInputElement;
      if (input.files!.length <=0){
        console.log('llorelo')
        return;
      }
      const file:File = input.files![0];
      this.imageService.uploadFile(file);

  }
}
