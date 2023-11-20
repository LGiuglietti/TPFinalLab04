import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, ObservedValueOf, catchError, forkJoin, map, of } from 'rxjs';
import { Movie } from '../Models';

@Injectable({
  providedIn: 'root'
})
export class MoviesService {
  // This API is aux 
  private ghibliREST = "https://ghibli.rest/films"
  // This API to use
  private ghibliAPI = "https://ghibliapi.vercel.app/films"

  constructor(private http: HttpClient) { }

  getAll(): Promise<any> {
    return this.http.get(this.ghibliAPI).toPromise();
  }

  getAllObservable() {
    return this.http.get(this.ghibliAPI);
  }

  getById(movieID: string): Promise<any> {
    return this.http.get<Movie>(this.ghibliAPI + '/' + movieID).toPromise();
  }

  getByIdObservable(idMovie: string): Observable<string> {
    return this.http.get<Movie>(this.ghibliAPI + '/' + idMovie).pipe(
      map((res: Movie) => {
        return res.image;
      }),
      catchError((error: any) => {
        console.log(error);
        return of(''); // Return an empty string in case of an error
      })
    );
  }

  getImagesCarrousel(): Observable<string[]> {
    const observableArray: Observable<string>[] = [
      this.getByIdObservable("58611129-2dbc-4a81-a72f-77ddfc1b1b49"),
      this.getByIdObservable("12cfb892-aac0-4c5b-94af-521852e46d6a"),
      this.getByIdObservable("cd3d059c-09f4-4ff3-8d63-bc765a5184fa")
    ];
  
    return forkJoin(observableArray); // Combine observables into an array using forkJoin
  }

}
