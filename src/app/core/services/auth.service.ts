import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { lastValueFrom } from 'rxjs';
import { User } from '../Models';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private apiService: ApiService) { }

  public async checkAuth(email:string, password: string): Promise<User[]>{

    let users: User[] = [];

    try{

      let apiResponse =  this.apiService.getUser(email,password); // Recibo la respuesta de la api en forma de observable

      users = await lastValueFrom(apiResponse);// Transformo el observable en una promesa y espero a que se resuelva con el await. Lo que me devuelve es el User[] porque asi se puso en el apiService

    }catch(error){
      console.log(error);
    }

    return users;
  }
}
