import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LoginComponent } from '../../../features/auth/pages/login/login.component';

@Component({

  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  menuOpen = false;
  accountMenuOpen = false;

  constructor(private router: Router) {}

  toggleMenu() {
    this.menuOpen = !this.menuOpen;
    if (!this.menuOpen) {
      this.accountMenuOpen = false;
    }
  }

  toggleAccountMenu() {
    this.accountMenuOpen = !this.accountMenuOpen;
  }

  closeMenus() {
    this.menuOpen = false;
    this.accountMenuOpen = false;
  }

  goToHome() {
    this.router.navigate(['/']);
    this.closeMenus();
  }

  goToTimeline() {
    this.router.navigate(['/timeline']);
    this.closeMenus();
  }

  goToLogin() {
    this.router.navigate(['/login']);
    this.closeMenus();
  }

  goToRegister() {
    this.router.navigate(['/register']);
    this.closeMenus();
  }
  goToSetting() {
    this.router.navigate(['/settings'])
    this.closeMenus();
  }
  goToAdminPage(){
    this.router.navigate(['/admin/moderation'])
  }
}
