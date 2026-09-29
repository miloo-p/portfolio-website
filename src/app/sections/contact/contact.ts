import {
  Component,
  ElementRef,
  HostListener,
  inject,
  Renderer2,
  OnDestroy,
  ViewChild,
} from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { BtnCtaPrimary } from '../../shared/components/btn-cta-primary/btn-cta-primary';
import { TranslatePipe } from '@ngx-translate/core';
import { LegalNotes } from '../../pages/legal-notes/legal-notes';
import { NgIf } from '@angular/common';
import { scrollBehavior } from '../../shared/utils/motion';

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
  private host = inject<ElementRef<HTMLElement>>(ElementRef);

  @ViewChild('privacyModal') private privacyModal?: ElementRef<HTMLElement>;
  @ViewChild('privacyModalClose') private privacyModalClose?: ElementRef<HTMLButtonElement>;
  /** Element that had focus before the modal opened; focus returns there on close. */
  private modalTrigger: HTMLElement | null = null;

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
  /** True after sending failed because of a server or network error. */
  public showErrorMessage = false;
  /** Whether the privacy policy modal is open. */
  isPrivacyModalOpen = false;

  /**
   * Whether a control currently shows a validation error, i.e. it is touched and invalid.
   *
   * @param name - Name of the form control.
   * @returns `true` if the error message of the control is visible.
   */
  hasVisibleError(name: keyof typeof this.contactForm.controls): boolean {
    const control = this.contactForm.controls[name];
    return control.touched && control.invalid;
  }

  /**
   * Opens or closes the privacy policy modal and locks page scrolling while it is open.
   * Moves focus into the modal when it opens and back to the trigger when it closes.
   *
   * @param event - Optional triggering event, e.g. a link click. Its default action is prevented.
   */
  togglePrivacyModal(event?: Event) {
    if (event) {
      event.preventDefault();
    }
    this.isPrivacyModalOpen = !this.isPrivacyModalOpen;

    if (this.isPrivacyModalOpen) {
      this.modalTrigger = document.activeElement as HTMLElement | null;
      this.renderer.addClass(document.body, 'no-scroll');
      setTimeout(() => this.privacyModalClose?.nativeElement.focus());
    } else {
      this.renderer.removeClass(document.body, 'no-scroll');
      this.modalTrigger?.focus();
      this.modalTrigger = null;
    }
  }

  /**
   * Closes the privacy policy modal when Escape is pressed.
   */
  @HostListener('document:keydown.escape')
  onEscape() {
    if (this.isPrivacyModalOpen) {
      this.togglePrivacyModal();
    }
  }

  /**
   * Keeps Tab and Shift+Tab focus cycling inside the open modal.
   *
   * @param event - The keydown event from inside the modal.
   */
  trapFocus(event: KeyboardEvent) {
    if (event.key !== 'Tab' || !this.privacyModal) {
      return;
    }

    const focusable = this.privacyModal.nativeElement.querySelectorAll<HTMLElement>(
      'a[href], button:not([disabled]), input, textarea, select, [tabindex]:not([tabindex="-1"])',
    );
    const first = focusable[0];
    const last = focusable[focusable.length - 1];

    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first.focus();
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
   * If the form is invalid, marks all fields as touched to show validation errors
   * and focuses the first invalid field so screen readers announce its error.
   * Server and network errors are logged to the console and shown to the user.
   *
   * @returns A promise that resolves once the request has finished.
   */
  async onSubmit() {
    if (this.contactForm.invalid) {
      this.contactForm.markAllAsTouched();
      setTimeout(() =>
        this.host.nativeElement
          .querySelector<HTMLElement>('.contact__form .ng-invalid:not(form)')
          ?.focus(),
      );
      return;
    }

    this.isSending = true;
    this.showErrorMessage = false;
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
        this.showErrorMessage = true;
      }
    } catch (error) {
      console.error('Netzwerk-Fehler:', error);
      this.showErrorMessage = true;
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
        targetElement.scrollIntoView({ behavior: scrollBehavior() });
      }
    } else {
      window.open(url, '_blank');
    }
  }
}
