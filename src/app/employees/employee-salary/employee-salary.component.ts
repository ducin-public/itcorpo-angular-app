import { CurrencyPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { Money } from 'src/app/api/data-contracts';

@Component({
  selector: 'itcorpo-employee-salary',
  styleUrl: './employee-salary.component.css',
  template: `<p>{{ salary() | currency }}</p>`,
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [CurrencyPipe]
})
export class EmployeeSalaryComponent {

  salary = input<Money>() // EITHER employee or salary
}

