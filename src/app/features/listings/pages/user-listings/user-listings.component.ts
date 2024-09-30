import { Component } from '@angular/core';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import { octPencil, octPlus, octTrash } from '@ng-icons/octicons';
import { ListingCardComponent } from './../../components/listing-card/listing-card.component';

@Component({
  selector: 'app-user-listings',
  standalone: true,
  imports: [NgIconComponent, ListingCardComponent],
  providers: [provideIcons({ octPlus, octPencil, octTrash })],
  templateUrl: './user-listings.component.html',
  styleUrl: './user-listings.component.css',
})
export class UserListingsComponent {}
