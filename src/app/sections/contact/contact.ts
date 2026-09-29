import { Component, inject, Renderer2, OnDestroy } from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { BtnCtaPrimary } from '../../shared/components/btn-cta-primary/btn-cta-primary';
import { TranslatePipe } from '@ngx-translate/core';
import { LegalNotes } from '../../pages/legal-notes/legal-notes';
import { NgIf } from '@angular/common';

/**
 * Contact section with a validated contact form that is sent via `mailer.php`,
 * plus a modal showing the privacy policy.
 */
@Component({
  selector: 'app-contact',
  imports: [BtnCtaPrimary, ReactiveFormsModule, TranslatePipe, LegalNotes, NgIf],
  templateUrl: './contact.html',
  styleUrl: './contact.scss',
})
export class Contact implements OnDestroy {
  private renderer = inject(Renderer2);

  /** Contact form with name, email, message and the required privacy consent. */
  public contactForm = new FormGroup({
    firstName: new FormControl('', [Validators.required]),
    lastName: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    message: new FormControl('', [Validators.required, Validators.minLength(10)]),
    privacy: new FormControl(false, [Validators.requiredTrue]),
  });

  /** True while the form is being sent. */
  public isSending = false;
  /** True for 5 seconds after the message was sent successfully. */
  public showSuccessMessage = false;
  /** Whether the privacy policy modal is open. */
  isPrivacyModalOpen = false;

  /**
   * Opens or closes the privacy policy modal and locks page scrolling while it is open.
   *
   * @param event - Optional triggering event, e.g. a link click. Its default action is prevented.
   */
  togglePrivacyModal(event?: Event) {
    if (event) {
      event.preventDefault();
    }
    this.isPrivacyModalOpen = !this.isPrivacyModalOpen;

    if (this.isPrivacyModalOpen) {
      this.renderer.addClass(document.body, 'no-scroll');
    } else {
      this.renderer.removeClass(document.body, 'no-scroll');
    }
  }

  /**
   * Releases the scroll lock in case the component is destroyed while the modal is open.
   */
  ngOnDestroy() {
    this.renderer.removeClass(document.body, 'no-scroll');
  }

  /**
   * Validates the form and sends it as JSON to `/mailer.php`.
   * On success, resets the form and shows the success message for 5 seconds.
   * If the form is invalid, marks all fields as touched to show validation errors.
   * Server and network errors are logged to the console.
   *
   * @returns A promise that resolves once the request has finished.
   */
  async onSubmit() {
    if (this.contactForm.invalid) {
      this.contactForm.markAllAsTouched();
      return;
    }

    this.isSending = true;
    const formValues = this.contactForm.value;
    const fullName = `${formValues.firstName} ${formValues.lastName}`.trim();

    try {
      const response = await fetch('/mailer.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: fullName,
          email: formValues.email,
          message: formValues.message,
        }),
      });

      const result = await response.json();

      if (response.ok && result.status === 'success') {
        this.showSuccessMessage = true;
        this.contactForm.reset();

        setTimeout(() => (this.showSuccessMessage = false), 5000);
      } else {
        console.error('Server-Fehler:', result.message);
      }
    } catch (error) {
      console.error('Netzwerk-Fehler:', error);
    } finally {
      this.isSending = false;
    }
  }

  /**
   * Smoothly scrolls to an in-page anchor or opens an external URL in a new tab.
   *
   * @param url - An anchor selector starting with `#` or an absolute URL. Empty values are ignored.
   */
  goToLink(url: string) {
    if (!url) {
      return;
    }

    if (url.startsWith('#')) {
      const targetElement = document.querySelector(url);
      if (targetElement) {
        targetElement.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      window.open(url, '_blank');
    }
  }
}
