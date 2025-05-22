import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../../core/services/auth-services';

@Component({
  selector: 'app-settings',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './user-settings.component.html',
  styleUrls: ['./user-settings.component.css'],
})
export class SettingsComponent implements OnInit {
  userForm!: FormGroup;
  user: any;

  constructor(private fb: FormBuilder, private authService: AuthService) {}

  ngOnInit(): void {
    this.user = this.authService.getCurrentUser();

    this.userForm = this.fb.group({
      prenom_utilisateur: [this.user?.prenom_utilisateur || '', Validators.required],
      nom_utilisateur: [this.user?.nom_utilisateur || '', Validators.required],
      adresse_email: [this.user?.adresse_email || '', [Validators.required, Validators.email]],
      mot_de_passe: [''], // nouveau mot de passe
      confirmPassword: [''] // confirmation
    });
  }

  get firstLetter(): string {
    return this.user?.prenom_utilisateur?.charAt(0)?.toUpperCase() || '';
  }

  onSubmit() {
    if (this.userForm.valid) {
      console.log('Données à envoyer au back :', this.userForm.value);
      // ici tu peux appeler un service pour faire un PUT/PATCH vers ton API
    }
  }
}
