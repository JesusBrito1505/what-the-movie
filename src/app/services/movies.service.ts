import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { environment } from '../../environments/environment';
@Injectable({
  providedIn: 'root'
})

export class MoviesService {
  
  constructor( private http: HttpClient ){}

  searchMovies(title: string, page: number = 1): Observable<{ movies: any[], totalResults: number }>{
    
    const apiKey = environment.apiKey;
    const url = `${environment.apiUrl}?apikey=${apiKey}&s=${title}&page=${page}`;

    return this.http.get<any>(url).pipe(
      map(response =>({
        movies: response.Search || [],
        totalResults: parseInt(response.totalResults ||  10)
      }))
    );
  }

}
