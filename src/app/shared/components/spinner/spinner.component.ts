import { Component } from '@angular/core';

@Component({
  selector: 'itcorpo-spinner',
  template: `
    <div class="flex justify-center items-center">
      <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
    </div>
  `
})
export class SpinnerComponent {}
