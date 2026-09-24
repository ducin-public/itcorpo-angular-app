import { Component, ChangeDetectionStrategy } from '@angular/core';

// originally based on https://manuel-rauber.com/2016/01/05/angular-2-spinner-component/

@Component({
    selector: 'itcorpo-overlay',
    styleUrls: ['overlay.css'],
    template: `
    <div class="spinner positional-overlay">
      <div class="bounce1"></div>
      <div class="bounce2"></div>
      <div class="bounce3"></div>
    </div>`,
    changeDetection: ChangeDetectionStrategy.Eager,
    standalone: false
})
export class OverlayComponent {
}
