import { Component, Input } from '@angular/core';

import { apiURL } from '../../../api/config';

@Component({
    selector: 'itcorpo-image',
    template: `<img class="thumb" src="{{ src }}" />`,
    styles: [`
img.thumb {
  border: 1px solid #ddd; /* Gray border */
  border-radius: 4px;  /* Rounded border */
  padding: 5px; /* Some padding */
  width: 150px; /* Set a small width */
}

img.thumb:hover {
  box-shadow: 0 0 2px 1px rgba(0, 140, 186, 0.5);
}
  `],
    standalone: false
})
export class ImageComponent {
  @Input()
  src!: string
}
