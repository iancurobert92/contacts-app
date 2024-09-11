import { NgClass, NgFor, NgIf, UpperCasePipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { KeysPipe } from '../../pipes';
import { ContactGroup } from '../../models';

@Component({
  selector: 'app-contact-list',
  standalone: true,
  imports: [NgFor, NgIf, NgClass, KeysPipe, UpperCasePipe],
  templateUrl: './contact-list.component.html',
  styleUrl: './contact-list.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ContactListComponent {
  @Input()
  data?: ContactGroup;
}
