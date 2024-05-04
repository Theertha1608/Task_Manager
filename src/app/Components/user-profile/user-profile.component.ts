import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { UserService } from '../../Services/user.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
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

  fetchUserDetails(): void {
    const userId = this.userService.getCurrentUserId();
    if (userId) {
      this.userService.getUserById(userId).subscribe(
        user => {
          this.user = user;
          this.profileImageUrl = `assets/Images/${user.profilePicture}`;
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
    const imageUrl = `assets/Images/${imageName}`;
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
      const file = event.target.files[0]
      this.user.profilePicture = file.name; 
    }
  }

  initChangePasswordForm(): void {
    this.changePasswordForm = this.formBuilder.group({
      currentPassword: ['', Validators.required],
      newPassword: ['', Validators.required],
      confirmPassword: ['', Validators.required]
    });
  }

  get changePasswordControls() {
    return this.changePasswordForm.controls;
  }

  savePassword(): void {
    if (this.changePasswordForm.invalid) {
      return;
    }

    const currentPassword = this.changePasswordControls['currentPassword'].value;
    const newPassword = this.changePasswordControls['newPassword'].value;
    const confirmPassword = this.changePasswordControls['confirmPassword'].value;

    if (newPassword !== confirmPassword) {
      window.alert("New password and confirm password don't match.");
      return;
    }

    // Validate current password
    if (this.user.password !== currentPassword) {
      window.alert("Current password is incorrect.");
      return;
    }

    // Update password
    this.userService.updateUserPassword(newPassword);
    window.alert("Password updated successfully!");
    this.router.navigate(['/dashboard']);
  }
}
