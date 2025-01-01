import { Pipe, PipeTransform } from '@angular/core';

import { Employee } from 'src/app/api/data-contracts';
import { flag } from '../shared/nationality/nationality';

@Pipe({
  name: 'flag'
})
export class FlagPipe implements PipeTransform {

  transform(e: Employee, args?: any): string {
    return flag(e.nationality)
  }

}
