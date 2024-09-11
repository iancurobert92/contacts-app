import { Pipe, PipeTransform } from '@angular/core';
import { Contact, ContactGroup } from '../models';

@Pipe({
  name: 'keys',
  standalone: true,
  pure: true,
})
export class KeysPipe implements PipeTransform {
  transform(value: ContactGroup): string[] {
    return Object.keys(value);
  }
}
