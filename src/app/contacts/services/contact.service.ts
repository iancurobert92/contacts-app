import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { Contact, ContactFilter, ContactGroup } from '../models';

@Injectable({
  providedIn: 'root',
})
export class ContactService {
  CONTACTS: Contact[] = [
    {
      id: 'morgan',
      firstName: 'morgan',
      lastName: 'freeman',
      group: 'work',
    },
    {
      id: 'alain',
      firstName: 'alain',
      lastName: 'delon',
      group: 'friends',
    },
    {
      id: 'al',
      firstName: 'al',
      lastName: 'pacino',
      group: 'friends',
    },
    {
      id: 'anthony',
      firstName: 'anthony',
      lastName: 'hopkins',
      group: 'work',
    },
    {
      id: 'brad',
      firstName: 'brad',
      lastName: 'pitt',
      group: 'friends',
    },
    {
      id: 'joaquin',
      firstName: 'joaquin',
      lastName: 'phoenix',
      group: 'work',
    },
    {
      id: 'matt',
      firstName: 'matt',
      lastName: 'damon',
      group: 'friends',
    },
    {
      id: 'michael',
      firstName: 'michael',
      lastName: 'caine',
      group: 'others',
    },
    {
      id: 'tommy',
      firstName: 'tommy',
      lastName: 'lee jones',
      group: 'family',
    },
  ];

  private contactsSubj = new BehaviorSubject<Contact[]>(this.CONTACTS);
  private contactFilterSubj = new BehaviorSubject<ContactFilter>({ name: '' });
  private selectedContactSubj = new BehaviorSubject<Contact | undefined>(undefined);

  get contacts$(): Observable<Contact[]> {
    return this.contactsSubj.asObservable().pipe(map(this.sortContactsAlphabetically));
  }

  get selectedContact$(): Observable<Contact | undefined> {
    return this.selectedContactSubj.asObservable();
  }

  get contactGroup$(): Observable<ContactGroup> {
    return this.contacts$.pipe(map(this.mapToContactGroup));
  }

  get contactFilter$(): Observable<ContactFilter> {
    return this.contactFilterSubj.asObservable();
  }

  get contactFilterSnapshot(): ContactFilter {
    return this.contactFilterSubj.value;
  }

  search(contactFilter: ContactFilter) {
    const text = contactFilter.name.trim();
    const group = contactFilter.group?.toLocaleLowerCase();

    this.contactsSubj.next(this.CONTACTS);

    const filteredContacts = this.contactsSubj.value.filter((contact) => {
      const fullName = `${contact.firstName} ${contact.lastName}`;
      const includesText = fullName ? fullName.includes(text) : true;
      const matchesGroup = group ? contact.group === group : true;
      return includesText && matchesGroup;
    });
    this.contactsSubj.next(filteredContacts);

    this.contactFilterSubj.next(contactFilter);
  }

  createContact(contact: Contact) {
    contact.id = contact.firstName;
    this.CONTACTS.push(contact);
    this.search(this.contactFilterSubj.value);
  }

  editContact(contact: Contact) {
    const currentContactIndex = this.CONTACTS.findIndex((el) => el.id === contact.id);
    this.CONTACTS[currentContactIndex] = contact;
    this.search(this.contactFilterSubj.value);
  }

  deleteContact(contact: Contact) {
    const currentContactIndex = this.CONTACTS.findIndex((el) => el.id === contact.id);
    this.CONTACTS.splice(currentContactIndex, 1);
    this.search(this.contactFilterSubj.value);
  }

  selectContact(contact: Contact | undefined) {
    this.selectedContactSubj.next(contact);
  }

  private mapToContactGroup = (contacts: Contact[]): ContactGroup =>
    contacts.reduce((acc, contact) => {
      const firstLetter = contact.firstName.charAt(0).toLowerCase();
      if (!acc[firstLetter]) {
        acc[firstLetter] = [];
      }
      acc[firstLetter].push(contact);
      return acc;
    }, {} as { [key: string]: Contact[] });

  private sortContactsAlphabetically = (contacts: Contact[]) =>
    contacts.sort((a, b) => a.firstName.localeCompare(b.firstName));
}
