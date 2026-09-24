import { Component, EventEmitter, Output, Input, SimpleChanges, ChangeDetectionStrategy } from '@angular/core';

export type DropdownOptions = {
  [key: string]: string;
}

@Component({
    selector: 'itcorpo-dropdown',
    templateUrl: './dropdown.component.html',
    styles: [],
    changeDetection: ChangeDetectionStrategy.Eager,
    standalone: false
})
export class DropdownComponent {
  @Input()
  options!: DropdownOptions

  entries!: { key: string, value: string }[]

  @Output()
  private valueChange = new EventEmitter<string>()

  ngOnChanges(changes: SimpleChanges) {
    if (changes.options.currentValue) {
      this.entries = Object.entries(changes.options.currentValue as DropdownOptions)
        .map(([key, value]) => ({ key, value }))
    }
  }

  onChange(value: Event){
    this.valueChange.emit(String(value))
  }
}
