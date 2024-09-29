import { Component, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GalleriaModule } from 'primeng/galleria';
import { Image } from '../../../images/interfaces/image';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
@Component({
  selector: 'app-listing-details',
  standalone: true,
  imports: [GalleriaModule, NgIconComponent],
  // providers: [provideIcons({ faSolidToilet })],
  templateUrl: './listing-details.component.html',
  styleUrl: './listing-details.component.css',
})
export class ListingDetailsComponent {
  @Input()
  set listingId(listingId: string) {
    console.log(listingId);
    // this.listing$ = this.service.getHero(listingId);
  }

  images: Image[] | undefined;

  responsiveOptions: any[] | undefined;

  constructor(private route: ActivatedRoute) {}
  ngOnInit(): void {
    this.listingId = this.route.snapshot.paramMap.get('id')!;
    this.images = [
      {
        photoUrl:
          'https://thumbor.forbes.com/thumbor/fit-in/900x510/https://www.forbes.com/home-improvement/wp-content/uploads/2022/07/Paris_Exterior_4-Edit-e1714649473120.png',
      },
      {
        photoUrl:
          'https://thumbor.forbes.com/thumbor/fit-in/900x510/https://www.forbes.com/home-improvement/wp-content/uploads/2022/07/Paris_Exterior_4-Edit-e1714649473120.png',
      },
      {
        photoUrl:
          'https://thumbor.forbes.com/thumbor/fit-in/900x510/https://www.forbes.com/home-improvement/wp-content/uploads/2022/07/Paris_Exterior_4-Edit-e1714649473120.png',
      },
      {
        photoUrl:
          'https://thumbor.forbes.com/thumbor/fit-in/900x510/https://www.forbes.com/home-improvement/wp-content/uploads/2022/07/Paris_Exterior_4-Edit-e1714649473120.png',
      },
      {
        photoUrl:
          'https://thumbor.forbes.com/thumbor/fit-in/900x510/https://www.forbes.com/home-improvement/wp-content/uploads/2022/07/Paris_Exterior_4-Edit-e1714649473120.png',
      },
      {
        photoUrl:
          'https://thumbor.forbes.com/thumbor/fit-in/900x510/https://www.forbes.com/home-improvement/wp-content/uploads/2022/07/Paris_Exterior_4-Edit-e1714649473120.png',
      },
    ];
    this.responsiveOptions = [
      {
        breakpoint: '1024px',
        numVisible: 5,
      },
      {
        breakpoint: '768px',
        numVisible: 3,
      },
      {
        breakpoint: '560px',
        numVisible: 1,
      },
    ];
  }
}
