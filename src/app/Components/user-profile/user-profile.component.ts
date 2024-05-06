import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { UserService } from '../../Services/user.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { SideNavbarComponent } from '../side-navbar/side-navbar.component';

@Component({
  selector: 'app-user-profile',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, SideNavbarComponent],
  templateUrl: './user-profile.component.html',
  styleUrl: './user-profile.component.scss'
})
export class UserProfileComponent implements OnInit {
  user: any = {};
  editMode: boolean = false;
  profileImageUrl: string = '';
  changePasswordForm!: FormGroup;
  sanitizer: any;
  router: any;

  constructor(
    private userService: UserService,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {
    this.fetchUserDetails();
    this.initChangePasswordForm();
  }

  // Fetch user details from the service
  fetchUserDetails(): void {
    const userId = this.userService.getCurrentUserId();
    if (userId) {
      this.userService.getUserById(userId).subscribe(
        user => {
          this.user = user;
          this.profileImageUrl = `assets/Images/${user.profilePicture}`;
        }
      );
    }
  }

  // Get profile image URL from assets
  getProfileImageUrl(imageName: string): void {
    const imageUrl = `assets/Images/${imageName}`;
    this.userService.getImageAsDataUrl(imageUrl).subscribe(
      dataUrl => {
        this.profileImageUrl = this.sanitizer.bypassSecurityTrustUrl(dataUrl);
      }
    );
  }

  // Toggle edit mode for user details
  toggleEditMode(): void {
    this.editMode = !this.editMode;
  }

  // Save user details
  saveUserDetails(): void {
    const userId = this.userService.getCurrentUserId();
    if (userId && this.user) {
      this.userService.updateUser(userId, this.user).subscribe(
        response => {
          // Success message
          window.alert('User details updated successfully!');
          this.editMode = false;
        },
        error => {
          // Error message
          window.alert('Failed to update user details. Please try again.');
        }
      );
    } else {
      // Error message
      window.alert('Failed to update user details. User ID or user object is null.');
    }
  }

  // Handle file selection for profile picture
  onFileSelected(event: any): void {
    if (event.target.files && event.target.files.length > 0) {
      const file = event.target.files[0]
      this.user.profilePicture = file.name; 
    }
  }

  // Initialize change password form
  initChangePasswordForm(): void {
    this.changePasswordForm = this.formBuilder.group({
      currentPassword: ['', Validators.required],
      newPassword: ['', Validators.required],
      confirmPassword: ['', Validators.required]
    });
  }

  // Getter for change password form controls
  get changePasswordControls() {
    return this.changePasswordForm.controls;
  }

  // Save password
  savePassword(): void {
    if (this.changePasswordForm.invalid) {
      return;
    }

    const currentPassword = this.changePasswordControls['currentPassword'].value;
    const newPassword = this.changePasswordControls['newPassword'].value;
    const confirmPassword = this.changePasswordControls['confirmPassword'].value;

    if (newPassword !== confirmPassword) {
      // Error message
      window.alert("New password and confirm password don't match.");
      return;
    }

    // Validate current password
    if (this.user.password !== currentPassword) {
      // Error message
      window.alert("Current password is incorrect.");
      return;
    }

    // Update password
    this.userService.updateUserPassword(newPassword);
    // Success message
    window.alert("Password updated successfully!");
    this.router.navigate(['/dashboard']);
  }
}
