import { Component } from '@angular/core';
import { FormsModule, FormGroup, ReactiveFormsModule, Validators, FormControl,  ValidationErrors, AbstractControl } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';


@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule, RouterModule, CommonModule, ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})

export class RegisterComponent {

  formProfil = new FormGroup({
    nom: new FormControl("", [Validators.required, Validators.minLength(3)]),
    prenom: new FormControl('', [Validators.required, Validators.minLength(3)]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(6)]),
    confirmPass: new FormControl('', [Validators.required])
  }, { validators: this.passwordMatchValidator });

  constructor(private router: Router) {}

  // Validation personnalisé pour le confirm password
  passwordMatchValidator(group: AbstractControl): ValidationErrors | null {
    const password = group.get('password')?.value;
    const confirmPass = group.get('confirmPass')?.value;
    return password === confirmPass ? null : { passwordMismatch: true };
  }

  register() {
    if (this.formProfil.valid) {
      const formData = this.formProfil.value;
      console.log("Formulaire valide :", formData);
      alert(`Merci ${formData.prenom} :)`);
      this.formProfil.reset();
      this.router.navigate(['/login']);
    } else {
      console.log("Formulaire invalide");
    }
  }
}

