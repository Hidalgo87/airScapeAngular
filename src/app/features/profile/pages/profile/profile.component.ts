import { Component } from '@angular/core';
import { ImageService } from '../../../images/services/image.service';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent {
  constructor(private imageService:ImageService){
    this.imageService = imageService;
  }
  onUpload(event:Event){
const fileName = 'file';
    const input = event.target as HTMLInputElement;
    if (input.files!.length <=0){
      console.log('llorelo')
      return;
    }
    const file:File = input.files![0]
    const response=  this.imageService.uploadImage(file);
  }
}
