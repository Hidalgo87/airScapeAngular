import { Component, OnInit, WritableSignal } from '@angular/core';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import { Router, RouterLink } from '@angular/router';
import {
  heroArrowLeftEndOnRectangle,
  heroUser,
  heroHome,
} from '@ng-icons/heroicons/outline';
import { NgClass } from '@angular/common';
import { UserService } from '../../../auth/services/user.service';
import { octSearch } from '@ng-icons/octicons';
import { User } from '../../../features/profile/interfaces/user.interface';
import { Subscription } from '@supabase/supabase-js';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, NgIconComponent, NgClass],
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
  // private userSubscription: Subscription;

  user: User | undefined;
  constructor(private userService: UserService, private router: Router) {
    // this.userSubscription = this.userService.isLogged$.subscribe(
    //   isLogged => {
    //     if ( isLogged ) {
    //       this.user = this.userService.getUser();
    //     } else {
    //       this.user = undefined;
    //     }
    //   }
    // )
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
