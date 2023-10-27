import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map, switchMap } from 'rxjs';
import { User } from '../Models';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private baseURL = "http://localhost:3000";

  constructor(private http: HttpClient) { }

  public getUser(email: string, contrasenia: string): Observable<User[]> {
    return this.http.get<User[]>(`${this.baseURL}/users?email=${email}&password=${contrasenia}`);
  }

  checkEmailExists(user: User): Observable<boolean> {
    return this.http.get<any[]>(`${this.baseURL}/users?email=${user.email}`).pipe(
      map((users) => {
        return users.length > 0;
      })
    );
  }
  public setUser(user: User): Observable<any> {
    return this.checkEmailExists(user).pipe(
      switchMap((res) => {
        if (res) {
          throw new Error('Email ya registrado');
        }
        else {
          return this.http.post(`${this.baseURL}/users/`, user);
        }
      })
    );
}
}