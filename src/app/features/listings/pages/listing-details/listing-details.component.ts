import { Component, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-listing-details',
  standalone: true,
  imports: [],
  templateUrl: './listing-details.component.html',
  styleUrl: './listing-details.component.css',
})
export class ListingDetailsComponent {
  @Input()
  set listingId(listingId: string) {
    console.log(listingId);
    // this.listing$ = this.service.getHero(listingId);
  }

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.listingId = this.route.snapshot.paramMap.get('id')!;
  }
}
