import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'itcorpo-fadebox',
  template: `
    <div [ngClass]="[
      'fixed z-50 w-80 right-12 bottom-12 p-4 rounded-lg border border-gray-300 bg-white shadow-lg transition-all duration-1000',
      currentlyFadeOut ? 'opacity-0 translate-x-full' : 'opacity-100 translate-x-0'
    ]">
      <ng-content></ng-content>
    </div>
  `,
})
export class FadeboxComponent implements OnInit, OnDestroy {
  public currentlyFadeOut = true;
  private intervalId: any;

  ngOnInit() {
    this.intervalId = setInterval(() => {
      this.currentlyFadeOut = !this.currentlyFadeOut;
    }, 3000);
  }

  ngOnDestroy() {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  }
}
