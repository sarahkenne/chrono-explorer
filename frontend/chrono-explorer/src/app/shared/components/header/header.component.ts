import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../../core/services/auth-services';
import { CommonModule } from '@angular/common';

@Component({
  imports: [RouterLink, CommonModule],
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  menuOpen = false;
  accountMenuOpen = false;
   isLoggedIn = false;
    userName = '';
    isLoggedAdmin= false

  constructor(private router: Router, private authService: AuthService) {}

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

  ngOnInit(): void {
    this.authService.authStatus$.subscribe(status => {
      this.isLoggedIn = status;
      if (status) {
        const user = this.authService.getCurrentUser();
        this.userName = `${user.prenom_utilisateur} ${user.nom_utilisateur}`;
        if(user.role == 'admin'){
          this.isLoggedAdmin = true;
        }
      } else {
        this.userName = '';
      }
    });
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login'], { replaceUrl: true })
    this.closeMenus()
    this.isLoggedAdmin = false;
  }
 
}
