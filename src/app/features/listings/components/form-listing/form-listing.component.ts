import { Component } from '@angular/core';
import { FloatLabelModule } from 'primeng/floatlabel';
import { FormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputTextareaModule } from 'primeng/inputtextarea';

@Component({
  selector: 'app-form-listing',
  standalone: true,
  imports: [
    FloatLabelModule,
    FormsModule,
    InputTextModule,
    InputNumberModule,
    InputTextareaModule,
  ],
  templateUrl: './form-listing.component.html',
  styleUrl: './form-listing.component.css',
})
export class FormListingComponent {
  title: string | undefined;
  description: string | undefined;
  address: string | undefined;
  price: number | undefined;
  bedrooms: number | undefined;
  bathrooms: number | undefined;
  guests: number | undefined;
  latitude: number | undefined;
  longitude: number | undefined;
  files: File[] | undefined;
}
