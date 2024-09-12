import { AsyncPipe, NgIf } from '@angular/common';
import { Component, DestroyRef, inject, OnInit } from '@angular/core';
import { ContactDetailsComponent } from '../contact-details/contact-details.component';
import { ContactFiltersComponent } from '../contact-filters/contact-filters.component';
import { ContactListComponent } from '../contact-list/contact-list.component';
import { MatButtonModule } from '@angular/material/button';
import { ContactService } from '../../services';
import { MatDialog } from '@angular/material/dialog';
import { AddEditContactDialogComponent } from '../add-edit-contact-dialog/add-edit-contact-dialog.component';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Contact } from '../../models';

@Component({
  selector: 'app-contacts',
  standalone: true,
  imports: [AsyncPipe, ContactDetailsComponent, ContactFiltersComponent, ContactListComponent, MatButtonModule],
  templateUrl: './contacts.component.html',
  styleUrl: './contacts.component.scss',
})
export class ContactsComponent {
  readonly contactGroup$ = this.contactService.contactGroup$;
  readonly selectedContact$ = this.contactService.selectedContact$;
  readonly dialog = inject(MatDialog);

  private destroyRef = inject(DestroyRef);

  constructor(private contactService: ContactService) {}

  handleAddContactClick() {
    this.dialog
      .open(AddEditContactDialogComponent, {
        width: '250px',
      })
      .afterClosed()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((data) => data && this.contactService.createContact(data));
  }

  handleDeleteContactClick(contact: Contact) {
    console.log(contact);

    this.contactService.deleteContact(contact);
    this.contactService.selectContact(undefined);
  }

  handleContactClick(contact: Contact) {
    this.contactService.selectContact(contact);
  }
}
