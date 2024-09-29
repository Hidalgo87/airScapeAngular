import { Component } from '@angular/core';
import { SearchBarComponent } from '../../../search/components/search-bar/search-bar.component';
import { ListingCardComponent } from '../../../listings/components/listing-card/listing-card.component';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import { octNorthStar } from '@ng-icons/octicons';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [SearchBarComponent, ListingCardComponent, NgIconComponent],
  providers: [provideIcons({ octNorthStar })],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {}
