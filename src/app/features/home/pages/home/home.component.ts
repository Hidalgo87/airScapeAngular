import { Component } from '@angular/core';
import { SearchBarComponent } from '../../../search/components/search-bar/search-bar.component';
import { ListingCardComponent } from '../../../listings/components/listing-card/listing-card.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [SearchBarComponent, ListingCardComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {}
