import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class WatchLaterService {

  private storageKey = 'watchLater';

  constructor() {}

  getList(): any[] {
    return JSON.parse(localStorage.getItem(this.storageKey) || '[]');
  }

  add(movie: any): void{
    const list = this.getList();

    if (!list.find(m=> m.imdbID === movie.imdbID)){
      list.push(movie);
      localStorage.setItem(this.storageKey, JSON.stringify(list));
    }
  }

  remove(id:number): void{
    const list = this.getList().filter(m=> m.imdbID !== id);
    localStorage.setItem(this.storageKey, JSON.stringify(list));
  }

  clear(): void{
    localStorage.removeItem(this.storageKey);
  }
  
  exists(id: number): boolean {
    return this.getList().some(m => m.id === id);
  }

}
