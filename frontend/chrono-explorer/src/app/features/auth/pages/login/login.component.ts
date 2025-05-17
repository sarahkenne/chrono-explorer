import { Component } from '@angular/core';
import { FormsModule,  } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, RouterModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  email = '';
  password = '';
  imageLogin= "/images/basic_earth_map_continents_app.jpg";
  showPassword = false;
  errorMessage= '';
  connection = false;

  constructor(private router: Router) {}

  login() {

    if(!this.email || !this.password)
    {
      this.errorMessage='Tous les champs sont obiligatoire';
    }
    else if(this.email == "admin@gmail.com" && this.password == "admin@124"){
        console.log('Connexion avec', this.email, this.password);
        this.connection == true;
        this.router.navigate(["/admin/moderation"])
    }
    else if(this.email == "user@gmail.com" && this.password== 'user@124')
    {
      this.connection == true;
      this.router.navigate(["/timeline"])
    }
    else 
    alert("Mot de passe ou email introuvable :(")
   
  }

  forgotPassword() {
    console.log('Mot de passe oublié cliqué');
    this.router.navigate(['/forgot-password']);
  }

  createAccount() {
    console.log('Créer un compte cliqué');
    this.router.navigate(['/register']);
  }

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }
}
