import { Component, DestroyRef, inject, OnInit } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ContactService } from '../../services';

@Component({
  selector: 'app-contact-filters',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatButtonModule],
  templateUrl: './contact-filters.component.html',
  styleUrl: './contact-filters.component.scss',
})
export class ContactFiltersComponent implements OnInit {
  searchForm = this.fb.group({ term: '' });

  private destroyRef = inject(DestroyRef);

  constructor(private fb: FormBuilder, private contactService: ContactService) {}

  ngOnInit(): void {
    this.searchForm.valueChanges
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((data) => this.contactService.search(data.term ?? ''));
  }

  handleAdvancedFilterClick(event: Event) {
    event.preventDefault();
    console.log('click');
  }
}
