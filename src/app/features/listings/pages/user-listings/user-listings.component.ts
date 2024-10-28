import { Component, OnInit } from '@angular/core';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import { octPencil, octPlus, octTrash } from '@ng-icons/octicons';
import { ListingCardComponent } from './../../components/listing-card/listing-card.component';
import { RouterLink } from '@angular/router';
import { ListingsService } from '../../services/listings.service';
import { CommonModule } from '@angular/common';
import { ListingBrief } from '../../interfaces/listingBrief.interface';
import { heroMagnifyingGlass } from '@ng-icons/heroicons/outline';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmationService } from 'primeng/api';

@Component({
  selector: 'app-user-listings',
  standalone: true,
  imports: [
    NgIconComponent,
    ListingCardComponent,
    RouterLink,
    CommonModule,
    ConfirmDialogModule,
  ],
  providers: [
    provideIcons({ octPlus, octPencil, octTrash, heroMagnifyingGlass }),
    ConfirmationService,
  ],
  templateUrl: './user-listings.component.html',
  styleUrl: './user-listings.component.css',
})
export class UserListingsComponent implements OnInit {
  listings: ListingBrief[] = [];

  constructor(
    private listingsService: ListingsService,
    private confirmationService: ConfirmationService
  ) {}

  ngOnInit(): void {
    this.listings = this.listingsService.getListingsOfCurrentUser();
    console.log(this.listings);
  }

  confirm(event: Event, listingId: string) {
    this.confirmationService.confirm({
      target: event.target as EventTarget,
      message: 'Are you sure that you want to proceed?',
      header: 'Confirmation',
      icon: 'pi pi-exclamation-triangle',
      acceptIcon: 'none',
      rejectIcon: 'none',
      rejectButtonStyleClass: 'p-button-text',
      accept: () => {
        this.listingsService.deleteListing(listingId);
        this.listings = this.listings.filter(
          (item) => item.listingId !== listingId
        );
        // this.messageService.add({
        //   severity: 'info',
        //   summary: 'Confirmed',
        //   detail: 'You have accepted',
        // });
      },
    });
  }
}
