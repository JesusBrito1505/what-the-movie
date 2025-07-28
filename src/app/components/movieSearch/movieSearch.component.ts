import { CommonModule} from '@angular/common';
import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, ReactiveFormsModule, FormBuilder} from '@angular/forms';
import { forkJoin } from 'rxjs';
import { MoviesService } from '../../services/movies.service';
import { PaginationComponent } from '../pagination/pagination.component';
import { MovieDetailsComponent } from '../movieDetails/movieDetails.component';
import { MovieDetailsService } from '../../services/movieDetails/movieDetails.service';
import { MovieFilterService } from '../../services/movieFilter/movieFilter.service';
import { WatchLaterComponent } from "../watchLater/watchLater.component";


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, PaginationComponent, MovieDetailsComponent, WatchLaterComponent],
  templateUrl: './movieSearch.component.html',
  styleUrl: './movieSearch.component.css'
})

export class AppComponent implements OnInit{
  
  movies: any[] = [];
  form!: FormGroup;
  
  currentPage = 1;
  totalResults = 0;
  totalPages =0;
  itemsPerPage: number = 18;

  selectedMovie: any = null;
  ModalVisible: boolean = false;

  filteredMovies: any[] = [];
  sortOrder: 'asc' | 'desc' | 'none' = 'none';
  selectedGenre: string = 'all';
  availableGenres: string[] = [];

  hasSearched: boolean = false;
  isLoading: boolean = false;
  
  @Input() whatchLaterList: Set<any> = new Set();
  modalListVisible: boolean = false;

  constructor(
    private fb: FormBuilder, 
    private movieService: MoviesService, 
    private movieDetailsService : MovieDetailsService,
    private movieFilterService : MovieFilterService
  ) {}

  ngOnInit(){
    this.form = this.fb.group({
      search: [''],
    });
  }

  onSubmit(){
    this.currentPage = 1;
    this.hasSearched = false;
    this.isLoading = true;
    this.loadMovies();    
  }

  loadMovies() {

    this.filteredMovies =[];
    const searchTerm = this.form.value.search;

    if (!searchTerm) return;

    const maxPagesToFetch = 10;

    const pageRequests = Array.from({length: maxPagesToFetch}, (_, i) =>
      this.movieService.searchMovies(searchTerm, i+1)
    );

   forkJoin(pageRequests).subscribe(pages => {
    const basicMovies = pages.flatMap(p => p.movies || []);

    if (basicMovies.length === 0) {
      this.movies = [];
      this.filteredMovies = [];
      this.totalResults = 0;
      this.availableGenres = [];
      this.isLoading = false;
      this.hasSearched = true;
      return;
    }

    const detailRequests = basicMovies.map(movie =>
      this.movieDetailsService.getMoviesDetails(movie.imdbID)
    );

    forkJoin(detailRequests).subscribe((detailedMovies: any[]) => {
      this.movies = detailedMovies;
      this.extractGenres(this.movies);
      this.applyFilters();
      this.isLoading = false;
      this.hasSearched = true;
    });
  });
}

  extractGenres(movies: any[]){
    const genresSet = new Set<string>();

    movies.forEach(movie=>{
      if(movie.Genre){
        movie.Genre.split(',').forEach((g: String)=> genresSet.add(g.trim()));
      }
    });

    this.availableGenres = Array.from(genresSet);
  }

  applyFilters(){
    
    let result = this.movies;

    if (this.selectedGenre !== 'all'){
      result = this.movieFilterService.filterByGenre(result, this.selectedGenre);
    }

    if(this.sortOrder !== 'none'){
      result = this.movieFilterService.sortByYear(result, this.sortOrder);
    }

    this.filteredMovies = result;
    
    this.totalResults = this.filteredMovies.length;
  }

  get paginatedMovies(){
    const pageStart = (this.currentPage - 1) * this.itemsPerPage;
    return this.filteredMovies.slice(pageStart, pageStart + this.itemsPerPage)
  }

  onSortChange(order: any) {
  this.sortOrder = order;
  this.applyFilters();
  }

  onGenreChange(genre: string) {
  this.selectedGenre = genre;
  this.applyFilters();
  }
  
  goToPage(page:number){
    this.currentPage = page;
  }

  openModal(movie: any){
    this.movieDetailsService.getMoviesDetails(movie.imdbID).subscribe(details =>{
      this.selectedMovie = details;
      this.ModalVisible = true;
    });
  }

  openModalList(){
    this.modalListVisible = true;
    console.log('Opened')
  }

  closeModal(){
    this.ModalVisible = false;
  }

  closeModalList(){
    this.modalListVisible = false;
    console.log('closed');
    
  }

  addToWatchLater( movie: any){
    this.whatchLaterList.add(movie);
    console.log('List:', this.whatchLaterList)
  }

  getWatchLaterList(): Set<any>{
    return this.whatchLaterList;
  }
}