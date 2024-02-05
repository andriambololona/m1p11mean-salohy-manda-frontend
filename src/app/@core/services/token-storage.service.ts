import { Injectable } from '@angular/core';

const TOKEN_KEY = 'auth-token';
const REFRESHTOKEN_KEY = 'auth-refreshtoken';
const USERNAME_KEY = 'username';
const ROLE_KEY = 'role';
const CATEGORIE_KEY='categorie';

@Injectable({
  providedIn: 'root'
})
export class TokenStorageService {
  constructor() { }

  signOut(): void {
    window.localStorage.clear();
  }

  public saveToken(token: string): void {
    window.localStorage.removeItem(TOKEN_KEY);
    window.localStorage.setItem(TOKEN_KEY, token);

  }


  public getToken(): string | null {
    return window.localStorage.getItem(TOKEN_KEY);
  }

  public saveRefreshToken(token: string): void {
    window.localStorage.removeItem(REFRESHTOKEN_KEY);
    window.localStorage.setItem(REFRESHTOKEN_KEY, token);
  }

  public getRefreshToken(): string | null {
    return window.localStorage.getItem(REFRESHTOKEN_KEY);
  }

  public saveUser(user: string): void {
    window.localStorage.removeItem(USERNAME_KEY);
    window.localStorage.setItem(USERNAME_KEY, user);
  }

  public getUser(): any {
    const user = window.localStorage.getItem(USERNAME_KEY);
    return user
  }
  public saveRole(role: string): void {
    window.localStorage.removeItem(ROLE_KEY);
    window.localStorage.setItem(ROLE_KEY, role);
  }

  public getRole(): any {
    const role = window.localStorage.getItem(ROLE_KEY);
    return role
  }
  public saveCategorie(departement: string): void {
    window.localStorage.removeItem(CATEGORIE_KEY);
    window.localStorage.setItem(CATEGORIE_KEY, departement);
  }

  public getCategorie(): any {
    const departement = window.localStorage.getItem(CATEGORIE_KEY);
    return departement
  }
}
