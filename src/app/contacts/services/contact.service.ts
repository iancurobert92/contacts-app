import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { Contact, ContactGroup } from '../models';

@Injectable({
  providedIn: 'root',
})
export class ContactService {
  CONTACTS: Contact[] = [
    {
      firstName: 'morgan',
      lastName: 'freeman',
      group: 'work',
    },
    {
      firstName: 'alain',
      lastName: 'delon',
      group: 'friends',
    },
    {
      firstName: 'al',
      lastName: 'pacino',
      group: 'friends',
    },

    {
      firstName: 'anthony',
      lastName: 'hopkins',
      group: 'work',
    },
    {
      firstName: 'brad',
      lastName: 'pitt',
      group: 'friends',
    },
    {
      firstName: 'joaquin',
      lastName: 'phoenix',
      group: 'work',
    },
    {
      firstName: 'matt',
      lastName: 'damon',
      group: 'friends',
    },
    {
      firstName: 'michael',
      lastName: 'caine',
      group: 'others',
    },
    {
      firstName: 'tommy',
      lastName: 'lee jones',
      group: 'family',
    },
  ];

  private contactsSubj = new BehaviorSubject<Contact[]>(this.CONTACTS);

  get contacts$(): Observable<Contact[]> {
    return this.contactsSubj.asObservable().pipe(map(this.sortContactsAlphabetically));
  }

  get contactGroup$(): Observable<ContactGroup> {
    return this.contacts$.pipe(map(this.mapToContactGroup));
  }

  search(term: string, group?: string) {
    const text = term.trim();

    if (text) {
      const filteredContacts = this.contactsSubj.value.filter((contact) => {
        const fullName = `${contact.firstName} ${contact.lastName}`;
        return fullName.concat(contact.lastName).includes(text) && (group ? contact.group === group : true);
      });
      this.contactsSubj.next(filteredContacts);
      return;
    }

    this.contactsSubj.next(this.CONTACTS);
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
