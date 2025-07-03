import { ChangeDetectorRef, Component } from '@angular/core';
import { SharedService } from '../shared.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-navbar',
  imports: [CommonModule],
  templateUrl: './navbar.html',
  styleUrl: './navbar.scss'
})
export class Navbar {
  public isInProgress:boolean = false;
  constructor(
    private sharedService:SharedService,
    private changeDetectorRef:ChangeDetectorRef
  ) { 
    this.sharedService.isInProgressSubject?.subscribe((isInProgress:boolean) => {
      this.isInProgress = isInProgress;
      this.changeDetectorRef.markForCheck()
    });
  }

  makeSorting(sortType:String)
  {
    this.sharedService.sendClickEvent(sortType);
  }

  ChangeSize(changeSize:any)
  {
    this.sharedService.sendSizeChangeEvent(changeSize);
  }
}
