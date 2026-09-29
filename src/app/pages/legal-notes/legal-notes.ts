import { Component } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';

/**
 * Privacy policy page. Also embedded in the contact section's privacy modal.
 */
@Component({
  selector: 'app-legal-notes',
  imports: [TranslatePipe],
  templateUrl: './legal-notes.html',
  styleUrl: './legal-notes.scss',
})
export class LegalNotes {}
