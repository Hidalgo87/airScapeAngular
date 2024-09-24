import { Component } from '@angular/core';
import { octPencil } from '@ng-icons/octicons';
import { NgIconComponent, provideIcons } from '@ng-icons/core';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [NgIconComponent],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css',
  providers: [provideIcons({ octPencil })],
})
export class ProfileComponent {}
