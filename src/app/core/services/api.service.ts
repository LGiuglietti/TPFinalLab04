import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, map, of, switchMap } from 'rxjs';
import { Favourite, User } from '../Models';

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
  public setFavourite(idUser: number, idPeli: string): Observable<boolean> {
    return this.http.post<boolean>(`${this.baseURL}/favourites?id=${idUser}/movies/`, idPeli);
  }

  public deleteFavourite(idUser: number, idPeli: string): Observable<boolean> {
    return this.http.delete(`${this.baseURL}/favourites?id=${idUser}/movies/${idPeli}`)
      .pipe(
        map(resp => true),
        catchError(error => of(false))
      );
  }

  public getFavourites(idUser: number): Observable<string[]> {
    return this.http.get<any>(`${this.baseURL}/favourites?idUser=${idUser}`).pipe(
      map((response: any) => {
        if (response && response.length > 0 && response[0].movies) {
          return response[0].movies.map((item: any) => item.idMovie);
        } else {
          return [];
        }
      })
    );
  }
}