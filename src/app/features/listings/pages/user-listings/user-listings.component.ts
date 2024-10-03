import { Component, OnInit } from '@angular/core';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import { octPencil, octPlus, octTrash } from '@ng-icons/octicons';
import { ListingCardComponent } from './../../components/listing-card/listing-card.component';
import { RouterLink } from '@angular/router';
import { ListingsService } from '../../services/listings.service';

@Component({
  selector: 'app-user-listings',
  standalone: true,
  imports: [NgIconComponent, ListingCardComponent, RouterLink],
  providers: [provideIcons({ octPlus, octPencil, octTrash })],
  templateUrl: './user-listings.component.html',
  styleUrl: './user-listings.component.css',
})
export class UserListingsComponent implements OnInit {
  constructor(private listingsService: ListingsService) {}

  ngOnInit(): void {
    // this.listingsService.
  }
}
