import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, concatMap, map, mergeMap, of, switchMap } from 'rxjs';
import { Favourite, Movie, User, Comment } from '../Models';

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
          throw new Error('Email already registered');
        }
        else {
          const body = {
            id: user.id,
            movies: []
          }
          return this.http.post<boolean>(`${this.baseURL}/favourites/`, body).pipe(
            concatMap(() => {
              return this.http.post<boolean>(`${this.baseURL}/users/`, user);
            })
          )
        }
      })
    );
  }

  public setFavourite(idUser: number, idPeli: string): Observable<any> {
    const url = `${this.baseURL}/favourites/${idUser}/`;
    return this.getFavourites(idUser).pipe(
      mergeMap((movies) => {
        if (movies && movies.includes(idPeli)) {
          return of(false); // Movie already in favorites
        } else {
          const updatedMovies = movies ? [...movies, idPeli] : [idPeli];
          const body = {
            id: idUser,
            movies: updatedMovies,
          };
          return this.http.put<boolean>(url, body);
        }
      }
      ))
  }

  public getFavourites(idUser: number): Observable<string[]> {
    return this.http.get<any>(`${this.baseURL}/favourites?id=${idUser}`).pipe(
      map((response: any) => {
        if (response.length > 0 && response[0].movies) { //si existe el usuario y tiene peliculas
          return response[0].movies;
        } else {
          return of(false);
        }
      })
    );
  }

  public deleteFavourite(idUser: number, idPeli: string): Observable<any> {
    return this.getFavourites(idUser).pipe(
      mergeMap((movies) => {
        const updatedMovies = movies.filter(movieId => movieId !== idPeli); //debido a que los string en movies no son endpoints filtro el arreglo
        const body = {
          id: idUser,
          movies: updatedMovies,
        };
        return this.http.put<boolean>(`${this.baseURL}/favourites/${idUser}/`, body); //y lo subo de vuelta
      },
      )
    );
  }

  public getComments(idMovie: string): Observable<Comment[]> {
    return this.http.get<Comment[]>(`${this.baseURL}/comments?id=${idMovie}`).pipe(
      map((res: any) => {
        if (res.length > 0 && res[0].comments) {
          console.log(res[0].comments);
          return res[0].comments;
        } else {
          console.log(res[0].comments);
          return of([]); // Returning an empty array as a default value when no comments are found
        }
      })
    );
  }
  public setComment(idMovie: string, newComment: Comment): Observable<boolean> {
    return this.getComments(idMovie).pipe(
      mergeMap((res) => {
        res.push(newComment);
 
        const body = {
          id: idMovie,
          comments: res,
        };
        return this.http.put<boolean>(`${this.baseURL}/comments/${idMovie}/`, body);
      })
    );
  }
}