import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

export class MoviesService {
  
  constructor( private http: HttpClient ){}

  searchMovies(title: string, page: number = 1): Observable<{ movies: any[], totalResults: number }>{
    
    const apiKey ='69839bdd';
    const url = `https://www.omdbapi.com/?apikey=${apiKey}&s=${title}&page=${page}`;

    return this.http.get<any>(url).pipe(
      map(response =>({
        movies: response.Search || [],
        totalResults: parseInt(response.totalResults ||  10)
      }))
    );
  }

}
