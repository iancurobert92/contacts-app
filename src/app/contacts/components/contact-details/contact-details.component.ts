import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Contact } from '../../models';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-contact-details',
  standalone: true,
  imports: [NgIf],
  templateUrl: './contact-details.component.html',
  styleUrl: './contact-details.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ContactDetailsComponent {
  @Input() data?: Contact;
}
