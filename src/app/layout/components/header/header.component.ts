import { Component, OnInit } from '@angular/core';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import { Router, RouterLink } from '@angular/router';
import {
  heroArrowLeftEndOnRectangle,
  heroUser,
  heroHome,
} from '@ng-icons/heroicons/outline';
import { CommonModule, NgClass } from '@angular/common';
import { UserService } from '../../../auth/services/user.service';
import { octSearch } from '@ng-icons/octicons';
import { User } from '../../../features/profile/interfaces/user.interface';
import { ProgressBarModule } from 'primeng/progressbar';
import { LoadingService } from '../../services/loading.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    RouterLink,
    NgIconComponent,
    NgClass,
    ProgressBarModule,
    CommonModule,
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
  providers: [
    provideIcons({
      heroArrowLeftEndOnRectangle,
      heroUser,
      heroHome,
      octSearch,
    }),
  ],
})
export class HeaderComponent implements OnInit {
  private userSubscription;
  private loadingSubscription;

  user: User | undefined;

  loading = false;

  constructor(
    private userService: UserService,
    private router: Router,
    private loadingService: LoadingService
  ) {
    this.userSubscription = this.userService.isLogged$.subscribe((isLogged) => {
      if (isLogged) {
        this.user = this.userService.getUser();
      } else {
        this.user = undefined;
      }
    });
    this.loadingSubscription = this.loadingService.loading$.subscribe(
      (loading) => {
        this.loading = loading;
      }
    );
  }

  ngOnInit(): void {
    this.user = this.userService.getUser();
  }

  isDropdownOpen = false;

  toggleDropdown() {
    this.isDropdownOpen = !this.isDropdownOpen;
  }

  closeDropdown() {
    this.isDropdownOpen = false;
  }

  onLogOut() {
    this.userService.logOut();
    this.router.navigateByUrl('/login');
  }
}
