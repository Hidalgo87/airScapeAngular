import { Component } from '@angular/core';
import { FloatLabelModule } from 'primeng/floatlabel';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-form-listing',
  standalone: true,
  imports: [FloatLabelModule, FormsModule],
  templateUrl: './form-listing.component.html',
  styleUrl: './form-listing.component.css',
})
export class FormListingComponent {
  title: string | undefined;
  description: string | undefined;
  address: string | undefined;
}
