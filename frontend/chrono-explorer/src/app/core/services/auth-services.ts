import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { userAuth } from '../../shared/models/auth.models'; 

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiRegister = 'http://localhost:3001/api/auth/register';
  private apiLogin = 'http://localhost:3001/api/auth/login';

  private authStatus = new BehaviorSubject<boolean>(this.hasToken());
  authStatus$ = this.authStatus.asObservable();

  constructor(private http: HttpClient) {}

    private hasToken(): boolean {
    return !!localStorage.getItem('token');
  }


  //Creation de compte post vers la BD
  registerUser(payload: userAuth): Observable<any> {
    return this.http.post(this.apiRegister, payload);
  }

  //Connexion 
  loginUser(credentials: { adresse_email: string, mot_de_passe: string }): Observable<any> {
    return this.http.post(this.apiLogin, credentials);
  }

  // Stockage après connexion
  setSession(token: string, user: any) {
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(user));
    this.authStatus.next(true);
  }

  //Déconnexion
  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.authStatus.next(false);
  }

  // Vérification du token
  isAuthenticated(): boolean {
    return !!localStorage.getItem('token');
  }

  // récupération de l'utilisateur
  getCurrentUser(): any | null {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  }
}
