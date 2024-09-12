import { AsyncPipe, NgIf } from '@angular/common';
import { Component, DestroyRef, inject, OnInit } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { Contact } from '../../models';
import { ContactService } from '../../services';
import { AddEditContactDialogComponent } from '../add-edit-contact-dialog/add-edit-contact-dialog.component';
import { ContactDetailsComponent } from '../contact-details/contact-details.component';
import { ContactFiltersComponent } from '../contact-filters/contact-filters.component';
import { ContactListComponent } from '../contact-list/contact-list.component';

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
    this.openDialog()
      .afterClosed()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((data) => data && this.contactService.createContact(data));
  }

  handleEditContactClick(contact?: Contact) {
    if (!contact) return;

    this.openDialog(contact)
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

  private openDialog(data?: Contact) {
    return this.dialog.open(AddEditContactDialogComponent, {
      width: '250px',
      data,
    });
  }
}
