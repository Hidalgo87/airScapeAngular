import { Component } from '@angular/core';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import { Router, RouterLink } from '@angular/router';
import {
  heroArrowLeftEndOnRectangle,
  heroUser,
  heroHome,
} from '@ng-icons/heroicons/outline';
import { NgClass } from '@angular/common';
import { UserService } from '../../../auth/services/user.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, NgIconComponent, NgClass],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
  providers: [
    provideIcons({ heroArrowLeftEndOnRectangle, heroUser, heroHome }),
  ],
})
export class HeaderComponent {
  user;
  constructor (private userService:UserService, private router:Router){
    this.user = userService.getUser();
  }

  isDropdownOpen = false;

  toggleDropdown() {
    this.isDropdownOpen = !this.isDropdownOpen;
  }

  closeDropdown() {
    this.isDropdownOpen = false;
  }

  onLogOut(){
    this.userService.logOut();
    this.router.navigateByUrl('/home');
  }

}
