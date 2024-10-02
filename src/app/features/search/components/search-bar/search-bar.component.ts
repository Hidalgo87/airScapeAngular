import { Component, OnInit } from '@angular/core';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import { heroMapPin, heroUser } from '@ng-icons/heroicons/outline';
import { octSearch } from '@ng-icons/octicons';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CalendarModule } from 'primeng/calendar';
import { FloatLabelModule } from 'primeng/floatlabel';
import { InputTextModule } from 'primeng/inputtext';
import { KeyFilterModule } from 'primeng/keyfilter';
import { InputNumberModule } from 'primeng/inputnumber';
import { ActivatedRoute, Router } from '@angular/router';

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
export class SearchBarComponent implements OnInit {
  city: string | undefined;
  date: Date | Date[] | undefined;
  guests: number | undefined;

  // blockChars: RegExp = /^[^<>*!+$]+$/;

  constructor(private router: Router, private route: ActivatedRoute) {}

  ngOnInit() {
    this.route.queryParams.subscribe((params) => {
      this.city = params['city'] || null;
      // this.date = params['date'] || null;
      this.guests = params['guests'] || null;
    });
  }

  onSearch(): void {
    this.router.navigate(['search'], {
      queryParams: {
        city: this.city,
        // date: this.date,
        guests: this.guests,
      },
      queryParamsHandling: 'merge',
    });
  }
}
