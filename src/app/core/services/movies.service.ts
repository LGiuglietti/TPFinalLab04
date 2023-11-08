import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MoviesService {
  // This API is aux 
  private ghibliREST = "https://ghibli.rest/films"
  // This API to use
  private ghibliAPI = "https://ghibliapi.vercel.app/films"

  constructor(private http: HttpClient) { }
  
  getAll():Promise<any>{
    return this.http.get(this.ghibliAPI).toPromise();
  }

  getAllObservable(){
    return this.http.get(this.ghibliAPI);
  }

  getById(movieID: string): Promise<any>{
    return this.http.get(this.ghibliAPI + '/' + movieID).toPromise();
  }
}
