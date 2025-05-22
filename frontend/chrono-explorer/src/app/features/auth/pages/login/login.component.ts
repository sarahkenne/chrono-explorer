import { Component } from '@angular/core';
import {  FormGroup, ReactiveFormsModule, Validators, FormControl } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Router, RouterLink } from '@angular/router';
import { FormsModule, } from '@angular/forms';
import { AuthService } from '../../../../core/services/auth-services';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, RouterModule, CommonModule, RouterLink, ReactiveFormsModule, ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  email = '';
  showPassword = false;
  errorMessage= '';
  connection = false;

  profilForm = new FormGroup({
    email: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required])
  })

  constructor(private router: Router, private authService: AuthService) { }

  
  login() {

    if(this.profilForm.valid)
    {
      const formData = this.profilForm.value
      console.log(formData)
      //authentificaion jwt et redirection
      const credentials = {
      adresse_email: formData.email ?? '',
      mot_de_passe: formData.password ?? ''
    };

    this.authService.loginUser(credentials).subscribe({
      next: (res) => {
        console.log("Connexion réussie :", res);

        //creation de la session User
        this.authService.setSession(res.token, res.user);

        // Stockage du token JWT et des infos utilisateur
        localStorage.setItem('token', res.token);
        localStorage.setItem('user', JSON.stringify(res.user));
        if(res.user.role = "utlisateur")
        {
          // Redirection vers la ligne de temps
        this.router.navigate(['/timeline'],);
        }
        else {
          this.router.navigate(['admin/moderation'])
        }

        /*if(res.user.role == 'admin'){
          // Redirection vers la ligne de temps
        this.router.navigate(['/timeline']);
        }
        */
        
      },
      error: (err) => {
        console.error("Erreur de connexion :", err);
        alert(err.error.message || "Email ou mot de passe incorrect.");
      }
    });
    }
    else{
      console.log('Error')
    }

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
