import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './layout/components/header/header.component';
import { BurnedListingService } from './features/listings/services/burnedListing.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit {
  title = 'airScapeAngular';

  constructor(private burnedListing: BurnedListingService) {}

  ngOnInit(): void {
    this.burnedListing.setBurnedListings();
  }
}
