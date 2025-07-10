import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MovieFilterService {

  sortByYear(movies: any[], order: 'asc' | 'desc') : any[]{
    return[...movies].sort((a, b)=>{
      const yearA = parseInt(a.Year);
      const yearB = parseInt(b.Year);
      return order === 'asc' ? yearA - yearB : yearB - yearA;
    });
  }

  filterByGenre(movies: any[], genre: string): any[] {
    if(!genre || genre === 'all' ) return movies;

    return movies.filter(movie => 
      movie.Genre.toLowerCase().includes(genre.toLocaleLowerCase())
    );
  }
  
}
