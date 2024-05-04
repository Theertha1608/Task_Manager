import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { Router, RouterLink } from '@angular/router';
import { UserService } from '../../Services/user.service';

@Component({
  selector: 'app-side-nav',
  standalone: true,
  imports: [CommonModule, RouterLink, MatIconModule, SideNavbarComponent],
  templateUrl: './side-navbar.component.html',
  styleUrl: './side-navbar.component.scss'
})
export class SideNavbarComponent {
  isSideOut = true;
  userEmail: string = '';
  userProfileImage: string = '';

  constructor(
    private router: Router,
    private userService: UserService
  ) {
    // Fetch user details when the component initializes
    this.fetchUserDetails();
  }

  toggleSideOut(): void {
    this.isSideOut = !this.isSideOut;
  }

  onHome(): void {
    this.router.navigate(['/dashboard']);
  } 

  onProfile(): void {
    this.router.navigate(['/user-profile']);
  }

  onAddTask(): void {
    this.router.navigate(['/create-task']);
  }

  onLogout(): void {
    this.router.navigate(['']);
  }

  private fetchUserDetails(): void {
    const userId = this.userService.getCurrentUserId();
    if (userId) {
      this.userService.getUserById(userId).subscribe(
        user => {
          this.userEmail = user.email;
          this.userProfileImage = `assets/Images/${user.profilePicture}`;
        },
        error => {
          console.error('Error fetching user details:', error);
        }
      );
    } else {
      console.error('User ID is null.');
    }
  }
}