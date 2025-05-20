import { Component } from '@angular/core';
import {  FormGroup, ReactiveFormsModule, Validators, FormControl } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Router, RouterLink } from '@angular/router';
import { FormsModule, } from '@angular/forms';


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

  constructor(private router: Router) {}

  
  login() {

    if(this.profilForm.valid)
    {
      const formData = this.profilForm.value
      console.log(formData)
      //authentificaion jwt et redirection
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
