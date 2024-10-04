import { Component, OnInit } from '@angular/core';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import { octPencil, octPlus, octTrash } from '@ng-icons/octicons';
import { ListingCardComponent } from './../../components/listing-card/listing-card.component';
import { RouterLink } from '@angular/router';
import { ListingsService } from '../../services/listings.service';
import { CommonModule } from '@angular/common';
import { ListingBrief } from '../../interfaces/listingBrief.interface';
import { heroMagnifyingGlass } from '@ng-icons/heroicons/outline';

@Component({
  selector: 'app-user-listings',
  standalone: true,
  imports: [NgIconComponent, ListingCardComponent, RouterLink, CommonModule],
  providers: [
    provideIcons({ octPlus, octPencil, octTrash, heroMagnifyingGlass }),
  ],
  templateUrl: './user-listings.component.html',
  styleUrl: './user-listings.component.css',
})
export class UserListingsComponent implements OnInit {
  listings: ListingBrief[] = [];

  constructor(private listingsService: ListingsService) {}

  ngOnInit(): void {
    this.listings = this.listingsService.getListingsOfCurrentUser();
    console.log(this.listings);
  }
}
