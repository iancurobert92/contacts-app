import { AsyncPipe } from '@angular/common';
import { Component, DestroyRef, inject, OnInit } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ContactService } from '../../services';
import { AdvancedFilterDialogComponent } from './../advanced-filter-dialog/advanced-filter-dialog.component';

@Component({
  selector: 'app-contact-filters',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatButtonModule, AsyncPipe],
  templateUrl: './contact-filters.component.html',
  styleUrl: './contact-filters.component.scss',
})
export class ContactFiltersComponent implements OnInit {
  readonly searchForm = this.fb.group({ term: '' });
  readonly contactFilter$ = this.contactService.contactFilter$;
  readonly dialog = inject(MatDialog);

  private destroyRef = inject(DestroyRef);

  constructor(private fb: FormBuilder, private contactService: ContactService) {}

  ngOnInit(): void {
    this.searchForm.valueChanges
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((data) => this.contactService.search({ name: data.term ?? '' }));
  }

  handleAdvancedFilterClick(event: Event) {
    event.preventDefault();

    this.dialog
      .open(AdvancedFilterDialogComponent, {
        width: '250px',
        data: this.contactService.contactFilterSnapshot,
      })
      .afterClosed()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((data) => data && this.contactService.search(data));
  }
}
