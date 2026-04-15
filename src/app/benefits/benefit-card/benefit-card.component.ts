import { Component, Input, Output, EventEmitter } from '@angular/core';
import { BenefitSubscription } from 'src/app/api/data-contracts';

@Component({
  selector: 'itcorpo-benefit-card',
  templateUrl: './benefit-card.component.html'
})
export class BenefitCardComponent {
  @Input() benefit!: BenefitSubscription;
  @Output() delete = new EventEmitter<void>();

  readonly typeColors: Record<string, string> = {
    'health': 'bg-blue-100 text-blue-800',
    'dental': 'bg-green-100 text-green-800',
    'vision': 'bg-purple-100 text-purple-800',
    'life': 'bg-yellow-100 text-yellow-800'
  };

  capitalize(str: string): string {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  /**
   * Return CSS class for benefit service type.
   * Uses `service.name` from the subscription (generated model).
   */
  getTypeClass(benefit: BenefitSubscription): string {
    const key = (benefit.service?.name || '').toLowerCase();
    return this.typeColors[key] || '';
  }
}
