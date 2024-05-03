import { Component, OnInit } from '@angular/core';
import { SideNavbarComponent } from '../side-navbar/side-navbar.component';
import { FormBuilder, FormGroup, FormsModule, Validators } from '@angular/forms';
import { UserService } from '../../Services/user.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-user-profile',
  standalone: true,
  imports: [SideNavbarComponent, CommonModule,FormsModule],
  templateUrl: './user-profile.component.html',
  styleUrl: './user-profile.component.scss'
})
export class UserProfileComponent implements OnInit {
  user: any = {};
  editMode: boolean = false;
  profileImageUrl: SafeUrl = '';

  constructor(
    private userService: UserService,
    private router: Router,
    private sanitizer: DomSanitizer
  ) { }

  ngOnInit(): void {
    this.fetchUserDetails();
  }

  fetchUserDetails(): void {
    const userId = this.userService.getCurrentUserId();
    if (userId) {
      this.userService.getUserById(userId).subscribe(
        user => {
          this.user = user;
          this.getProfileImageUrl(user.profilePicture);
        },
        error => {
          console.error('Error fetching user details:', error);
        }
      );
    } else {
      console.error('User ID is null.');
    }
  }

  getProfileImageUrl(imageName: string): void {
    const imageUrl = `assets/images/${imageName}`;
    this.userService.getImageAsDataUrl(imageUrl).subscribe(
      dataUrl => {
        this.profileImageUrl = this.sanitizer.bypassSecurityTrustUrl(dataUrl);
      },
      error => {
        console.error('Error loading profile image:', error);
      }
    );
  }
  toggleEditMode(): void {
    this.editMode = !this.editMode;
  }

  saveUserDetails(): void {
    const userId = this.userService.getCurrentUserId();
    if (userId && this.user) {
      this.userService.updateUser(userId, this.user).subscribe(
        response => {
          console.log('User details updated successfully!', response);
          this.editMode = false;
          window.alert('User details updated successfully!');
        },
        error => {
          console.error('Error updating user details:', error);
          window.alert('Failed to update user details. Please try again.');
        }
      );
    } else {
      console.error('User ID or user object is null.');
      window.alert('Failed to update user details. User ID or user object is null.');
    }
  }

  onFileSelected(event: any): void {
    if (event.target.files && event.target.files.length > 0) {
      const file = event.target.files[0];
      // Handle file upload or conversion to base64 string
      // You may need to use additional libraries or APIs for file upload
      this.user.profilePicture = file.name; // Assuming you want to store the file name
    }
  }
}