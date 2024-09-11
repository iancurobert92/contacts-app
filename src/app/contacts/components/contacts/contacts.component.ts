import { AsyncPipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ContactDetailsComponent } from '../contact-details/contact-details.component';
import { ContactFiltersComponent } from '../contact-filters/contact-filters.component';
import { ContactListComponent } from '../contact-list/contact-list.component';
import { MatButtonModule } from '@angular/material/button';
import { ContactService } from '../../services';

@Component({
  selector: 'app-contacts',
  standalone: true,
  imports: [AsyncPipe, ContactDetailsComponent, ContactFiltersComponent, ContactListComponent, MatButtonModule],
  templateUrl: './contacts.component.html',
  styleUrl: './contacts.component.scss',
})
export class ContactsComponent implements OnInit {
  contactGroup$ = this.contactService.contactGroup$;

  constructor(private contactService: ContactService) {}

  ngOnInit(): void {
    // this.contactService.search('e');
  }
}
