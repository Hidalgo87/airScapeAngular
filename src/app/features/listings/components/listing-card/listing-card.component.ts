import { Component, Input, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ListingBrief } from '../../interfaces/listingBrief.interface';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import { octPerson } from '@ng-icons/octicons';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-listing-card',
  standalone: true,
  imports: [RouterLink, NgIconComponent, CommonModule],
  providers: [provideIcons({ octPerson })],
  templateUrl: './listing-card.component.html',
  styleUrl: './listing-card.component.css',
})
export class ListingCardComponent implements OnInit {
  @Input() listing!: ListingBrief;

  ngOnInit(): void {
    if (this.listing?.createdAt) {
      this.listing.createdAt = new Date(this.listing.createdAt);
    }
  }
}
