import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MovieDetailsService {

  private apiUrl = `${environment.apiUrl}?apikey=${environment.apiKey}`

  constructor( private http: HttpClient) { }

  getMoviesDetails(id: string): Observable<any>{
    return this.http.get<any>(`${this.apiUrl}&i=${id}&plot=full`)
  }
}
