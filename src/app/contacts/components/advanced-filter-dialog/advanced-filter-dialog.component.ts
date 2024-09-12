import { NgFor } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { MatInputModule, MatLabel } from '@angular/material/input';
import { MatOption, MatSelect } from '@angular/material/select';
import { ContactFilter } from '../../models';

@Component({
  selector: 'app-advanced-filter-dialog',
  standalone: true,
  imports: [MatDialogModule, MatButtonModule, FormsModule, MatInputModule, MatLabel, MatSelect, MatOption, NgFor],
  templateUrl: './advanced-filter-dialog.component.html',
  styleUrl: './advanced-filter-dialog.component.scss',
})
export class AdvancedFilterDialogComponent implements OnInit {
  groups = ['Friends', 'Family', 'Work', 'Others'];
  contactFilter: ContactFilter = { name: '', group: this.groups[0] };

  constructor(@Inject(MAT_DIALOG_DATA) private data: ContactFilter) {}

  ngOnInit(): void {
    this.contactFilter = this.data;
  }
}
