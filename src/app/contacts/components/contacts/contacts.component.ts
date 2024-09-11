import { Component } from '@angular/core';
import { ContactDetailsComponent } from '../contact-details/contact-details.component';
import { ContactFiltersComponent } from '../contact-filters/contact-filters.component';
import { ContactListComponent } from '../contact-list/contact-list.component';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-contacts',
  standalone: true,
  imports: [ContactDetailsComponent, ContactFiltersComponent, ContactListComponent, MatButtonModule],
  templateUrl: './contacts.component.html',
  styleUrl: './contacts.component.scss',
})
export class ContactsComponent {}
