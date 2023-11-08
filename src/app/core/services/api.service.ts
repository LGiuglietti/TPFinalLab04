import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, map, of, switchMap } from 'rxjs';
import { Favourite, Movie, User } from '../Models';

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
    return this.http.get<User[]>(`${this.baseURL}/users?email=${user.email}`).pipe(
      map((users) => {
        return users.length > 0;
      })
    );
  }
  public setUser(user: User): Observable<boolean> {
    return this.checkEmailExists(user).pipe(
      switchMap((res) => {
        if (res) {
          throw new Error('Email ya registrado');
        }
        else {
          return this.http.post<boolean>(`${this.baseURL}/users/`, user);
        }
      })
    );
  }
  public setFavourite(idUser: number, idPeli: string): Observable<any> {//no queda otra que usar any
    const url = `${this.baseURL}/favourites?idUser=${idUser}`;
    return this.http.get<any>(url).pipe(
      map((response) => {
        console.log("funca")
        if (response.length > 0 && response[0].movies.includes(idPeli)) {
          console.log("funca")
          return alert("pelicula ya en favoritos")
        } else {
          console.log(this.http.post<boolean>(url, idPeli))
          return this.http.post<boolean>(url, idPeli);
        }
      })
    );
  }

  public deleteFavourite(idUser: number, idPeli: string): Observable<boolean> {
    return this.http.delete(`${this.baseURL}/favourites?id=${idUser}&${idPeli}`)
      .pipe(
        map(resp => true),
        catchError(error => of(false))
      );
  }

  public getFavourites(idUser: number): Observable<string[]> {
    return this.http.get<any>(`${this.baseURL}/favourites?idUser=${idUser}`).pipe(
      map((response: any) => {
        if (response.length > 0 && response[0].movies) { //si existe el usuario y tiene peliculas
          return response[0].movies;
        }
      })
    );
  }
}