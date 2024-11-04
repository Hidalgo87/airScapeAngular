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
import { DatePipe } from '@angular/common';

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
  providers: [provideIcons({ heroMapPin, heroUser, octSearch }), DatePipe],
  templateUrl: './search-bar.component.html',
  styleUrl: './search-bar.component.css',
})
export class SearchBarComponent implements OnInit {
  city: string | undefined;
  date: Date[] | null = null;
  guests: number | undefined;

  today = new Date();

  // blockChars: RegExp = /^[^<>*!+$]+$/;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private datePipe: DatePipe
  ) {}

  ngOnInit() {
    this.route.queryParams.subscribe((params) => {
      this.city = params['city'] || null;
      this.date = params['date'] || null;
      this.guests = params['guests'] || null;
      this.date = params['start-date']
        ? [
            new Date(`${params['start-date']}T00:00:00`),
            new Date(`${params['end-date']}T00:00:00`),
          ]
        : null;
    });
  }

  onSearch(): void {
    const startDate = this.date
      ? this.datePipe.transform(this.date[0], 'yyyy-MM-dd')
      : undefined;
    const endDate = this.date
      ? this.datePipe.transform(this.date[1], 'yyyy-MM-dd')
      : undefined;

    this.router.navigate(['search'], {
      queryParams: {
        city: this.city,
        guests: this.guests,
        'start-date': startDate,
        'end-date': endDate,
      },
      queryParamsHandling: 'merge',
    });
  }

  validateDates() {
    console.log(this.date);
    if (this.date && this.date[1] === null) {
      this.date = null;
    }
  }
}
