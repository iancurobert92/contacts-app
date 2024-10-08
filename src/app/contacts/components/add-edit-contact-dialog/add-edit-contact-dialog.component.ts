import { NgFor } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { MatInputModule, MatLabel } from '@angular/material/input';
import { MatOption, MatSelect } from '@angular/material/select';
import { ContactGroupType } from '../../enums';
import { Contact } from '../../models';

@Component({
  selector: 'app-add-edit-contact-dialog',
  standalone: true,
  imports: [MatDialogModule, MatButtonModule, FormsModule, MatInputModule, MatLabel, MatSelect, MatOption, NgFor],
  templateUrl: './add-edit-contact-dialog.component.html',
  styles: '',
})
export class AddEditContactDialogComponent implements OnInit {
  groups = [ContactGroupType.Friends, ContactGroupType.Family, ContactGroupType.Work, ContactGroupType.Others];
  contact: Contact = { firstName: '', lastName: '', group: this.groups[0] };

  constructor(@Inject(MAT_DIALOG_DATA) private data?: Contact) {}

  ngOnInit(): void {
    if (this.data) {
      this.contact = { ...this.data };
    }
  }
}
