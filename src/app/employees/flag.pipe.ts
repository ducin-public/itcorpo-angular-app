import { Pipe, PipeTransform } from '@angular/core';

import { Employee } from 'src/app/api/data-contracts';
import { flag } from '../shared/nationality/nationality';

@Pipe({ name: 'flag' })
export class FlagPipe implements PipeTransform {

  transform(e: Employee, args?: any): string {
    return flag(e.nationality)
  }

}

// @Pipe({
//   name: 'async',
//   pure: true,
// })
// export class FlagPipe implements PipeTransform {
//   lastValue: any

//   transform(stream: Observable<any>): string {
//     if(!this.sub){
//       this.sub = stream.subscribe({
//         next(value){ this.lastValue = value; }
//       })
//     }
//     return this.lastValue || undefined
//   }

    // ngOnDestroy(){...}

//   sub!: Subscription

// }
