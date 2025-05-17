import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-forgot-password',
  standalone: true,
  imports: [FormsModule, RouterModule, CommonModule],
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent {
  email = '';
  message = '';

  sendResetLink() {
    if (!this.email) {
      this.message = 'Veuillez entrer votre email.';
      return;
    }

    // Simulation d'envoi
    this.message = `Un lien de réinitialisation a été envoyé à ${this.email}`;
  }
}
