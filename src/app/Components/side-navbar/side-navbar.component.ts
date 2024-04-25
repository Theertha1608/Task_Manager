import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { Router } from '@angular/router';

@Component({
  selector: 'app-side-nav',
  standalone: true,
  imports: [CommonModule, MatIconModule],
  templateUrl: './side-navbar.component.html',
  styleUrl: './side-navbar.component.scss'
})
export class SideNavbarComponent {
  isSideOut = true;
  constructor(private router: Router){}

  toggleSideOut(): void {
    this.isSideOut = !this.isSideOut;
  }

    onHome(){
    this.router.navigate(['/dashboard']);
    } 
    onProfile(){
    this.router.navigate(['/profile']);
    }
    onHistory(){
    this.router.navigate(['/dashboard']);
    }
    onLogout(){
    this.router.navigate(['']);
    }
    
}
    


