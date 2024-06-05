import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserAuthService {

  constructor() { }

  public setRoles(roles: string): void {
    localStorage.setItem("roles", roles);
  }

  public getRoles(): string {
    return localStorage.getItem('roles') || '';
  }

  public setToken(jwtToken: string): void {
    localStorage.setItem("jwtToken", jwtToken);
  }

  public getToken(): string {
    return localStorage.getItem('jwtToken') || '';
  }

  public clear(): void {
    localStorage.clear();
  }

  public isLoggedIn(): boolean {
    return this.getRoles() !== '' && this.getToken() !== '';
  }

  public hasRole(role: string): boolean {
    const roles: string = this.getRoles();
    return roles.includes(role);
  }

  public isAdmin(): boolean {
    return this.hasRole('ROLE_ADMIN');
  }

  public isFormat(): boolean {
    return this.hasRole('ROLE_FORMAT');
  }

  public isAssistant(): boolean {
    return this.hasRole('ROLE_ASSISTANT');
  }
  

  public setUserId(id: string): void {
    localStorage.setItem("userId", id);
  }

  public getUserId(): string {
    return localStorage.getItem('userId') || '';
  }
  
}
