import { Component, input } from '@angular/core';
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
export class LegalNotes {
  /**
   * Whether the component is shown inside the privacy modal. The title is then an
   * `h2` (the landing page already has an `h1`), otherwise the page's `h1`.
   */
  inModal = input(false);
}
