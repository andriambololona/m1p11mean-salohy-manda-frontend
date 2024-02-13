import { Injectable } from '@angular/core';

const TOKEN_KEY = 'auth-token';
const REFRESHTOKEN_KEY = 'auth-refreshtoken';
const USERNAME_KEY = 'username';
const ROLE_KEY = 'role';
const CATEGORIE_KEY='categorie';
const EMAIL_kEY='email';
const ID_KEY='id';

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
  public saveRole(role: Array<string>): void {
    window.localStorage.removeItem(ROLE_KEY);
    window.localStorage.setItem(ROLE_KEY, JSON.stringify(role));
  }

  public getRole(): Array<string> {
    const role = JSON.parse(window.localStorage.getItem(ROLE_KEY));
    return role;
  }
  public saveCategorie(departement: string): void {
    window.localStorage.removeItem(CATEGORIE_KEY);
    window.localStorage.setItem(CATEGORIE_KEY, departement);
  }

  public getCategorie(): any {
    const departement = window.localStorage.getItem(CATEGORIE_KEY);
    return departement
  }
  public saveEmail(email:string){
    window.localStorage.removeItem(EMAIL_kEY);
    window.localStorage.setItem(EMAIL_kEY,email);
  }

  public getEmail():any{
    return window.localStorage.getItem(EMAIL_kEY);
  }

  public saveId(id:string){
    window.localStorage.removeItem(ID_KEY);
    window.localStorage.setItem(ID_KEY,id);
  }

  public geId():any{
    return window.localStorage.getItem(ID_KEY);
  }
}
