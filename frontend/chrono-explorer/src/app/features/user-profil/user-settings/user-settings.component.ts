import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-settings',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './user-settings.component.html',
  styleUrls: ['./user-settings.component.css'],
})
export class SettingsComponent {
  user = {
    firstName: 'Jean',
    lastName: 'Dupont',
    email: 'jean.dupont@example.com',
    password: '',
    confirmPassword: ''
  };

  updateSettings() {
    if (this.user.password !== this.user.confirmPassword) {
      alert('Les mots de passe ne correspondent pas');
      return;
    }
    console.log('Paramètres mis à jour', this.user);
    alert('Paramètres mis à jour avec succès !');
  }

  get firstLetter(): string {
    return this.user.firstName.charAt(0).toUpperCase();
  }
}
