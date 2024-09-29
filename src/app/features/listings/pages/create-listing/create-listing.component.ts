import { Component } from '@angular/core';
import { FormListingComponent } from '../../components/form-listing/form-listing.component';

@Component({
  selector: 'app-create-listing',
  standalone: true,
  imports: [FormListingComponent],
  templateUrl: './create-listing.component.html',
  styleUrl: './create-listing.component.css',
})
export class CreateListingComponent {}
