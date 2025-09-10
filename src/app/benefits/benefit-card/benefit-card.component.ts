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

  capitalize(str: unknown): string {
    // Safely coerce to string to avoid runtime errors when non-strings are passed
    const s = str == null ? '' : String(str);
    if (s.length === 0) return '';
    return s.charAt(0).toUpperCase() + s.slice(1);
  }

  /**
   * Return CSS class for benefit service type.
   * Uses `service` property from the Benefit object (generated model).
   */
  getTypeClass(benefit: BenefitSubscription): string {
    const map: Record<string, string> = {
      'lunch-card': 'health',
      'LUNCH_CARD': 'health',
      'healthcare': 'health',
      'health': 'health',
      'dental': 'dental',
      'vision': 'vision',
      'life': 'life'
    };

    // FIXME:
    const key = (map[benefit.service.name] || map[String(benefit.service.name).toLowerCase()] || '') as string;
    return this.typeColors[key] || '';
  }
}
