import { Component } from '@angular/core';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import { heroMapPin, heroUser } from '@ng-icons/heroicons/outline';
import { octSearch } from '@ng-icons/octicons';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CalendarModule } from 'primeng/calendar';
import { FloatLabelModule } from 'primeng/floatlabel';
import { InputTextModule } from 'primeng/inputtext';
import { KeyFilterModule } from 'primeng/keyfilter';
import { InputNumberModule } from 'primeng/inputnumber';

@Component({
  selector: 'app-search-bar',
  standalone: true,
  imports: [
    NgIconComponent,
    FormsModule,
    ReactiveFormsModule,
    CalendarModule,
    FloatLabelModule,
    InputTextModule,
    KeyFilterModule,
    InputNumberModule,
  ],
  providers: [provideIcons({ heroMapPin, heroUser, octSearch })],
  templateUrl: './search-bar.component.html',
  styleUrl: './search-bar.component.css',
})
export class SearchBarComponent {
  city: string | undefined;
  date: Date | Date[] | undefined;
  guests: number | undefined;

  // blockChars: RegExp = /^[^<>*!+$]+$/;
}
