import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'shotName',
  standalone: true
})
export class ShotNamePipe implements PipeTransform {

  transform(value?: string, ...args: unknown[]): unknown {
    if (!value) return '';
    return value.split(' ')[0];
  }

}
