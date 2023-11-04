import { Injectable } from '@angular/core';
import { User } from '../Models';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor() { }

  private user: User=new User();

  public setSessionUser(loggedUser:User)
  {
    this.user=loggedUser;
  }

 public getSessionUser(): User
  {
    return this.user;
  }
}
