import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { LoginComponent } from './pages/login/login.component'; 

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    FormsModule,    
    RouterModule
  ]
})
export class AuthModule { }
