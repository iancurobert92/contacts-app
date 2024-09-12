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
  imports: [AsyncPipe, ContactDetailsComponent, ContactFiltersComponent, ContactListComponent, MatButtonModule, NgIf],
  templateUrl: './contacts.component.html',
  styleUrl: './contacts.component.scss',
})
export class ContactsComponent implements OnInit {
  readonly contactGroup$ = this.contactService.contactGroup$;
  readonly dialog = inject(MatDialog);
  selectedContact?: Contact;

  private destroyRef = inject(DestroyRef);

  constructor(private contactService: ContactService) {}

  ngOnInit(): void {
    this.contactService.selectedContact$
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((contact) => (this.selectedContact = contact));
  }

  handleAddContactClick() {
    this.dialog
      .open(AddEditContactDialogComponent, {
        width: '250px',
      })
      .afterClosed()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((data) => data && this.contactService.createContact(data));
  }

  handleEditContactClick(contact?: Contact) {
    if (!contact) return;

    this.dialog
      .open(AddEditContactDialogComponent, {
        width: '250px',
        data: contact,
      })
      .afterClosed()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((data) => {
        if (data) {
          this.contactService.editContact(data);
          this.contactService.selectContact(data);
        }
      });
  }

  handleDeleteContactClick(contact?: Contact) {
    if (!contact) return;

    this.contactService.deleteContact(contact);
    this.contactService.selectContact(undefined);
  }

  handleContactClick(contact: Contact) {
    this.contactService.selectContact(contact);
  }
}
