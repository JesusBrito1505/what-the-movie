import { Component, Input, Output, EventEmitter, output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { retry } from 'rxjs';
import { WatchLaterService } from '../../services/watchLater/watch-later.service';

@Component({
  selector: 'app-watch-later',
  imports: [CommonModule],
  templateUrl: './watchLater.component.html',
  styleUrl: './watchLater.component.css'
})
export class WatchLaterComponent {

  @Input() modalListVisible : boolean = false;

  @Output() closeModalList = new EventEmitter<void>();
  @Input()  watchLaterList: any[] = [];

  constructor(
    private watchLaterService : WatchLaterService
  ){}

  close(){
    this.closeModalList.emit();
  }

  get movieSetAsArray(): any[]{
    return this.watchLaterList;
  }

  removeFromWatchLater(id: number): void{
    this.watchLaterService.remove(id);
    this.watchLaterList = this.watchLaterService.getList();
  }
}
