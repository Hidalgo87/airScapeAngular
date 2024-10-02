import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ListingBrief } from '../../interfaces/listingBrief.interface';

@Component({
  selector: 'app-listing-card',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './listing-card.component.html',
  styleUrl: './listing-card.component.css',
})
export class ListingCardComponent {
  @Input() listing!: ListingBrief;
  // @Input() id = 0;
  // @Input() title = '';
  // @Input() price = 0;
  // @Input() image_url = '';
  // @Input() address = '';
}
