import { Component, OnInit } from '@angular/core';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import { Router , RouterLink} from '@angular/router';
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
export class HeaderComponent implements OnInit {
  user:any;
  constructor(private router:Router, private userService:UserService){
    this.userService = userService;
}
  ngOnInit(): void {
    this.user = this.userService.getUser();
  }

  onLogOut() {
    this.userService.logOut();
    this.router.navigateByUrl("/login");
  }
  
  isDropdownOpen = false;

  toggleDropdown() {
    this.isDropdownOpen = !this.isDropdownOpen;
  }

  closeDropdown() {
    this.isDropdownOpen = false;
  }
}
