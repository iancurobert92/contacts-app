import { NgClass, NgFor, NgIf, UpperCasePipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { KeysPipe } from '../../pipes';
import { Contact, ContactGroup } from '../../models';

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

  @Input()
  selectedContact?: Contact;

  @Output()
  contactClick = new EventEmitter<Contact>();

  handleContactClick(contact: Contact) {
    this.contactClick.emit(contact);
  }
}
