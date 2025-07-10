import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MovieDetailsService {

  private apiUrl = 'https://www.omdbapi.com/?apikey=69839bdd'

  constructor( private http: HttpClient) { }

  getMoviesDetails(id: string): Observable<any>{
    return this.http.get<any>(`${this.apiUrl}&i=${id}&plot=full`)
  }
}
