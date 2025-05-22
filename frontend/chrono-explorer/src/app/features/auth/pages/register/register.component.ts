import { Component } from '@angular/core';
import { FormsModule, FormGroup, ReactiveFormsModule, Validators, FormControl, ValidationErrors, AbstractControl } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { userAuth } from '../../../../shared/models/auth.models';
import { AuthService } from '../../../../core/services/auth-services';


@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule, RouterModule, CommonModule, ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})

export class RegisterComponent {

  formProfil = new FormGroup({
    nom: new FormControl<string>("", [Validators.required, Validators.minLength(3)]),
    prenom: new FormControl<string>('', [Validators.required, Validators.minLength(3)]),
    email: new FormControl<string>('', [Validators.required, Validators.email]),
    password: new FormControl<string>('', [Validators.required, Validators.minLength(6)]),
    confirmPass: new FormControl('', [Validators.required])
  }, { validators: this.passwordMatchValidator });

  // Validation personnalisé pour le confirm password
  passwordMatchValidator(group: AbstractControl): ValidationErrors | null {
    const password = group.get('password')?.value;
    const confirmPass = group.get('confirmPass')?.value;
    return password === confirmPass ? null : { passwordMismatch: true };
  }

  constructor(private router: Router, private authService: AuthService) { }



  register() {
    if (this.formProfil.valid) {
      const formData = this.formProfil.value
      console.log(formData)
   

      const formValue = this.formProfil.value;

      const data: userAuth = {
      nom_utilisateur: formValue.nom ?? '',
      prenom_utilisateur: formValue.prenom ?? '',
      adresse_email: formValue.email ?? '',
      mot_de_passe: formValue.password ?? '',
      confirmer_mot_de_passe: formValue.confirmPass ?? '',
      role: ''
      };

      this.authService.registerUser(data).subscribe({
        next: (res) => {
          console.log("Inscription réussie :", res);
          alert(`Bienvenue${data.prenom_utilisateur} } !`);
          this.formProfil.reset();
          this.router.navigate(['/login']);
        },
        error: (err) => {
          console.error("Erreur lors de l'inscription :", err);
          alert("Une erreur est survenue. Veuillez réessayer.");
        }
      });

    } else {
      console.log("Formulaire invalide");
    }
  }
}

