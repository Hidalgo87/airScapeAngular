import { Component } from '@angular/core';
import { SearchBarComponent } from '../../components/search-bar/search-bar.component';
import { SliderModule } from 'primeng/slider';
import { FormsModule } from '@angular/forms';
import { InputNumberModule } from 'primeng/inputnumber';
import { DropdownModule } from 'primeng/dropdown';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import { octFilter, octSortDesc } from '@ng-icons/octicons';
import { ListingCardComponent } from '../../../listings/components/listing-card/listing-card.component';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [
    SearchBarComponent,
    SliderModule,
    FormsModule,
    InputNumberModule,
    DropdownModule,
    NgIconComponent,
    ListingCardComponent,
  ],
  providers: [provideIcons({ octFilter, octSortDesc })],
  templateUrl: './search.component.html',
  styleUrl: './search.component.css',
})
export class SearchComponent {
  price: number | undefined;
  sort: string | undefined;

  sortOptions = [{ name: 'Price' }, { name: 'Most recent' }];
}
