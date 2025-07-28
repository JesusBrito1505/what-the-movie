import { Component, Input, Output, EventEmitter, output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { retry } from 'rxjs';

@Component({
  selector: 'app-watch-later',
  imports: [CommonModule],
  templateUrl: './watchLater.component.html',
  styleUrl: './watchLater.component.css'
})
export class WatchLaterComponent {

  @Input() modalListVisible : boolean = false;

  @Output() closeModalList = new EventEmitter<void>();
  @Input()  watchLaterList: Set<any> = new Set();

  close(){
    this.closeModalList.emit();
  }

  get movieSetAsArray(): any[]{
    return [...this.watchLaterList]
  }
}
