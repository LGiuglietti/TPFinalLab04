import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { Observable, catchError, lastValueFrom, map, of, tap } from 'rxjs';
import { User } from '../Models';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private url: string = "http://localhost:3000/users";
  private user?: User;

  constructor(private apiService: ApiService,
              private http: HttpClient, private router: Router) { }

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

  get currentUser():User | undefined {
    if(!this.user) return undefined
    return {... this.user}
  }

  getUsers(): Observable<User[]>{
    return this.http.get<User[]>(this.url)
  }

  verifyUserAndPassword(email: string, password: string){
    this.getUsers().subscribe(users =>{
      users.find(u =>{
        if(u.password === password && u.email === email){
          this.user = u;
          localStorage.setItem('token', u.id.toString())
          this.router.navigate(['/main'])
        }
      })
    })
  }

  checkStatusAutentication(): Observable<boolean>{
    const token = localStorage.getItem('token');
    if(!token){
      return of(false)
    }
    return this.http.get<User>(`${this.url}/${token}`)
      .pipe(
        tap(u => this.user = u),
        map(u=>{
          console.log("Respuesta", !!u)
          return !!u
        }),
        catchError(err=> of(false))
      )
  }

  logout(){
    this.user = undefined
    localStorage.clear()
  }


}
