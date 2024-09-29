import { ChangeDetectionStrategy, Component } from '@angular/core';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import { heroMapPin, heroUser } from '@ng-icons/heroicons/outline';
import { octSearch } from '@ng-icons/octicons';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CalendarModule } from 'primeng/calendar';
import { FloatLabelModule } from 'primeng/floatlabel';

@Component({
  selector: 'app-search-bar',
  standalone: true,
  imports: [
    NgIconComponent,
    FormsModule,
    ReactiveFormsModule,
    CalendarModule,
    FloatLabelModule,
  ],
  providers: [provideIcons({ heroMapPin, heroUser, octSearch })],
  templateUrl: './search-bar.component.html',
  styleUrl: './search-bar.component.css',
})
export class SearchBarComponent {
  date: Date | Date[] | undefined;
}
