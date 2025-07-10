import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-movie-details',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './movieDetails.component.html',
  styleUrl: './movieDetails.component.css'
})
export class MovieDetailsComponent {

  @Input() movie: any;
  @Input() visible: boolean = false;

  @Output() closeModal = new EventEmitter<void>();

  close(){
    this.closeModal.emit();
  }
}
