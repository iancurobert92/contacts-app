import { Contact } from './contact.model';

export interface ContactGroup {
  [key: string]: Contact[];
}
