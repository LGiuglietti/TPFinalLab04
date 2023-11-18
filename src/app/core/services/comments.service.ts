import { Injectable } from '@angular/core';
import { Movie } from '../Models';

@Injectable({
  providedIn: 'root'
})
export class CommentsService {

  private readonly STORAGE_KEY = 'peli';
  private readonly defaultMovie: Movie = new Movie()
  constructor() { }

  setIdPeli(movie: Movie): void {
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(movie));
  }

  getPeli(): Movie {
    const storedData = localStorage.getItem(this.STORAGE_KEY);
    return storedData ? JSON.parse(storedData) : this.defaultMovie;
  }

}
