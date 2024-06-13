import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AutenticacionService {

  private isLoggedIn = false;
  private userEmail: string | null = null;

  constructor() {}

  login() {
    this.isLoggedIn = true;

  }

  logout() {
    this.isLoggedIn = false;
  }

  checkLogin(): boolean {
    return this.isLoggedIn;
  }

  //CORREO

  getUserEmail(): string | null {
    return this.userEmail;
  }
  
  setUserEmail(email: string) {
    this.userEmail = email;
  }

  logout1() {
    this.userEmail = null;
  }
}
