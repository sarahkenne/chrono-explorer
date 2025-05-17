import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule, RouterModule, CommonModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  nom = '';
  prenom = '';
  email = '';
  password = '';
  confirmPassword = '';
  errorMessage = '';

  constructor(private router: Router) {}

  register() {
    const emailRegex = /^((?!\.)[\w-_.]*[^.])@[\w-]+(\.\w+)+$/;

    if (!this.nom || !this.prenom || !this.email || !this.password || !this.confirmPassword) {
      this.errorMessage = 'Tous les champs sont obligatoires.';
      console.log("Erreur - champs manquants");
      return;
    }

    if (!emailRegex.test(this.email)) {
      this.errorMessage = 'Adresse email invalide.';
      console.log("Erreur - email invalide");
      return;
    }

    if (this.password !== this.confirmPassword) {
      this.errorMessage = 'Les mots de passe ne correspondent pas.';
      console.log("Erreur - mot de passe");
      return;
    }

   // Simulation création compte
    console.log('Compte créé :', this.nom, this.prenom, this.email);
    this.errorMessage = '';

    // Affichage de l'alerte personnalisée
    alert(`Bienvenue ${this.prenom} !`);

// Redirection vers la page de connexion
this.router.navigate(['/login']);



  }
}
