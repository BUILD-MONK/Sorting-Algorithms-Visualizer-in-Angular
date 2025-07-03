import { ChangeDetectorRef, Component } from '@angular/core';
import { Subscription } from 'rxjs';

import { getAnimationsForQuickSort } from '../alogrithms/quickSort';
import { getAnimationsForBubbleSort } from '../alogrithms/bubbleSort';
import { getAnimationsForHeapSort } from '../alogrithms/heapSort';
import { getMergeSortAnimations } from '../alogrithms/mergSort';
import { SharedService } from '../shared.service';
import { CommonModule } from '@angular/common';



@Component({
  selector: 'app-landing-view',
  imports: [CommonModule],
  templateUrl: './landing-view.html',
  styleUrl: './landing-view.scss'
})
export class LandingView {
  NUMBER_OF_ARRAY_BARS = 150;

  Array: any = [];
  PRIMARY_COLOR = 'orange';

  SECONDARY_COLOR = 'blueviolet';

  ANIMATION_SPEED_MS = 10;

  PIVOT_COLOR = "#333";

  NUMBER_OF_SWAP = 0;

  SELECTED_ALGORITHM = "";

  clickEventSubscription: Subscription;

  constructor(private sharedService: SharedService, private changeDetectorRef: ChangeDetectorRef) {
    this.resetArray();
    this.clickEventSubscription = this.sharedService.getClickEvent().subscribe((sortType) => {
      sharedService.isInProgressSubject.next(true);
      this.NUMBER_OF_SWAP = 0;
      switch (sortType) {
        case "re-define": {
          this.resetArray();
          break;
        }
        case "merg": {
          this.SELECTED_ALGORITHM = "MERGE SORT";
          this.mergSort();
          break;
        }
        case "quick": {
          this.SELECTED_ALGORITHM = "QUICK SORT";
          this.quickSort();
          break;
        }
        case "bubble": {
          this.SELECTED_ALGORITHM = "BUBBLE SORT";
          this.bubbleSort();
          break;
        }
        case "heap": {
          this.SELECTED_ALGORITHM = "HEAP SORT";
          this.heapSort();
          break;
        }
      }
    })

    this.sharedService.getChangeInSize().subscribe((size) => {
      this.NUMBER_OF_ARRAY_BARS = size;
      this.resetArray();
    });

  }

  resetArray() {
    const array = []
    for (let i = 0; i < this.NUMBER_OF_ARRAY_BARS; i++) {
      array.push(this.randomIntFromInterval(5, 730));
      if (i == this.NUMBER_OF_ARRAY_BARS - 1) {
        this.sharedService.isInProgressSubject.next(false);
      }
    }
    this.Array = array;
  }

  mergSort() {
    const arrayBars = document.getElementsByClassName('array-bar');
    let animations = getMergeSortAnimations(this.Array);
    const totalDuration = animations.length * this.ANIMATION_SPEED_MS;
    for (let i = 0; i < animations.length; i++) {
      const isColorChange = i % 3 !== 2;
      if (isColorChange) {
        const [barOneIdx, barTwoIdx] = animations[i];
        const barOneStyle = <HTMLElement>arrayBars[barOneIdx];
        const barTwoStyle = <HTMLElement>arrayBars[barTwoIdx];
        const color = i % 3 === 0 ? this.SECONDARY_COLOR : this.PRIMARY_COLOR;
        setTimeout(() => {
          barOneStyle.style.backgroundColor = color;
          barTwoStyle.style.backgroundColor = color;
        }, i * this.ANIMATION_SPEED_MS);
      } else {
        setTimeout(() => {
          const [barOneIdx, newHeight] = animations[i];
          const barOneStyle = <HTMLElement>arrayBars[barOneIdx];
          barOneStyle.style.height = `${newHeight}px`;
          this.NUMBER_OF_SWAP++;
          this.changeDetectorRef.markForCheck()
        }, i * this.ANIMATION_SPEED_MS);
      }
    }
    setTimeout(() => {
      this.sharedService.isInProgressSubject.next(false);
    }, totalDuration); 
  }

  quickSort() {
    let arrayBars = document.getElementsByClassName('array-bar');
    let animations = getAnimationsForQuickSort(this.Array);
    const totalDuration = animations.length * this.ANIMATION_SPEED_MS;
    for (let i = 0; i < animations.length; i++) {
      let check = animations[i][0];
      if (check === "pivoton") {
        let pivotBar = animations[i][1];
        const barPivotStyle = <HTMLElement>arrayBars[pivotBar];
        setTimeout(() => {
          barPivotStyle.style.backgroundColor = this.PIVOT_COLOR;
          
        }, i * this.ANIMATION_SPEED_MS);
      }
      else if (check === "highLighton") {
        const [barOneIdx, barTwoIdx] = animations[i].slice(1);
        const barOneStyle = <HTMLElement>arrayBars[barOneIdx];
        const barTwoeStyle = <HTMLElement>arrayBars[barTwoIdx];

        setTimeout(() => {
          barOneStyle.style.backgroundColor = this.SECONDARY_COLOR;
          barTwoeStyle.style.backgroundColor = this.SECONDARY_COLOR;
          
        }, i * this.ANIMATION_SPEED_MS);
      }
      else if (check === "highLightoff") {
        const [barOneIdx, barTwoIdx] = animations[i].slice(1);
        const barOneStyle = <HTMLElement>arrayBars[barOneIdx];
        const barTwoeStyle = <HTMLElement>arrayBars[barTwoIdx];

        setTimeout(() => {
          barOneStyle.style.backgroundColor = this.PRIMARY_COLOR;
          barTwoeStyle.style.backgroundColor = this.PRIMARY_COLOR;
          
        }, i * this.ANIMATION_SPEED_MS);
      }
      else if (check === "pivotOff") {
        let pivotBar = animations[i][1];
        const barPivotStyle = <HTMLElement>arrayBars[pivotBar];
        setTimeout(() => {
          barPivotStyle.style.backgroundColor = this.PRIMARY_COLOR;
          
        }, i * this.ANIMATION_SPEED_MS);
      }
      else if (check === "swap") {
        const [barIndexOne, barValueOne, barIndexTwo, barValueTwo] = animations[i].slice(1);
        const barOneStyle = <HTMLElement>arrayBars[barIndexOne];
        const barTwoeStyle = <HTMLElement>arrayBars[barIndexTwo];

        setTimeout(() => {
          barOneStyle.style.height = `${barValueOne}px`;
          barTwoeStyle.style.height = `${barValueTwo}px`;
          this.NUMBER_OF_SWAP++;
          this.changeDetectorRef.markForCheck()
          
        }, i * this.ANIMATION_SPEED_MS);

      }

    }
    setTimeout(() => {
      this.sharedService.isInProgressSubject.next(false);
    }, totalDuration); 
  }

  bubbleSort() {
    let animations = getAnimationsForBubbleSort(this.Array);
    let arrayBars = document.getElementsByClassName('array-bar');
    const totalDuration = animations.length * this.ANIMATION_SPEED_MS;
    for (let i = 0; i < animations.length; i++) {
      const [check, v1, v2, v3, v4] = animations[i].slice();
      if (check === "HighLightOn") {
        let barOneStyle = <HTMLElement>arrayBars[v1];
        let barTwoStyle = <HTMLElement>arrayBars[v2];

        setTimeout(() => {
          barOneStyle.style.backgroundColor = this.SECONDARY_COLOR;
          barTwoStyle.style.backgroundColor = this.SECONDARY_COLOR;
          
        }, i * this.ANIMATION_SPEED_MS);
      }
      else if (check === "HighLightOff") {
        let barOneStyle = <HTMLElement>arrayBars[v1];
        let barTwoStyle = <HTMLElement>arrayBars[v2];

        setTimeout(() => {
          barOneStyle.style.backgroundColor = this.PRIMARY_COLOR;
          barTwoStyle.style.backgroundColor = this.PRIMARY_COLOR;
          
        }, i * this.ANIMATION_SPEED_MS);
      }
      else if (check === "Swap") {
        let barOneStyle = <HTMLElement>arrayBars[v1];
        let barTwoStyle = <HTMLElement>arrayBars[v3];

        setTimeout(() => {
          barOneStyle.style.height = `${v2}px`;
          barTwoStyle.style.height = `${v4}px`;
          this.NUMBER_OF_SWAP++;
          this.changeDetectorRef.markForCheck()
          
        }, i * this.ANIMATION_SPEED_MS);
      }
    }
    setTimeout(() => {
      this.sharedService.isInProgressSubject.next(false);
    }, totalDuration);
  }

  heapSort() {
    let animations = getAnimationsForHeapSort(this.Array);
    let arrayBars = document.getElementsByClassName('array-bar');
    const totalDuration = animations.length * this.ANIMATION_SPEED_MS;

    for (let i = 0; i < animations.length; i++) {
      const [check, v1, v2, v3, v4] = animations[i].slice();
      if (check === "HighLightOn") {
        let barOneStyle = <HTMLElement>arrayBars[v1];
        let barTwoStyle = <HTMLElement>arrayBars[v2];

        setTimeout(() => {
          barOneStyle.style.backgroundColor = this.SECONDARY_COLOR;
          barTwoStyle.style.backgroundColor = this.SECONDARY_COLOR;
          
        }, i * this.ANIMATION_SPEED_MS);
      }
      else if (check === "HighLightOff") {
        let barOneStyle = <HTMLElement>arrayBars[v1];
        let barTwoStyle = <HTMLElement>arrayBars[v2];

        setTimeout(() => {
          barOneStyle.style.backgroundColor = this.PRIMARY_COLOR;
          barTwoStyle.style.backgroundColor = this.PRIMARY_COLOR;
          
        }, i * this.ANIMATION_SPEED_MS);
      }
      else if (check === "Swap") {
        let barOneStyle = <HTMLElement>arrayBars[v1];
        let barTwoStyle = <HTMLElement>arrayBars[v3];

        setTimeout(() => {
          barOneStyle.style.height = `${v2}px`;
          barTwoStyle.style.height = `${v4}px`;
          this.NUMBER_OF_SWAP++;
          this.changeDetectorRef.markForCheck()
          
        }, i * this.ANIMATION_SPEED_MS);
      }
    }
    setTimeout(() => {
      this.sharedService.isInProgressSubject.next(false);
    }, totalDuration);
  }

  randomIntFromInterval(min: any, max: any) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }
}

