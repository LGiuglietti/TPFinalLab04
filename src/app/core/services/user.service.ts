import { Injectable } from '@angular/core';
import { User } from '../Models';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private readonly STORAGE_KEY = 'currentUser';
  private readonly defaultUser: User = new User();

  constructor() { }

  public setSessionUser(loggedUser: User): void {
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(loggedUser));
  }

  public getSessionUser(): User {
    const storedData = localStorage.getItem(this.STORAGE_KEY);
    return storedData ? JSON.parse(storedData) : this.defaultUser;
  }
}
