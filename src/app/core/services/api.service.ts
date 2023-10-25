import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../Models';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private baseURL="http://localhost:3000";  

  constructor(private http: HttpClient) { }

  public getUser(email:string, contrasenia: string): Observable <User []>{
    return this.http.get<User[]>(`${this.baseURL}/users?email=${email}&password=${contrasenia}`);
  }

}
