import { Component, inject, Renderer2, OnDestroy } from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { BtnCtaPrimary } from '../../shared/components/btn-cta-primary/btn-cta-primary';
import { TranslatePipe } from '@ngx-translate/core';
import { RouterLink } from '@angular/router';
import { LegalNotes } from '../../pages/legal-notes/legal-notes';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-contact',
  imports: [BtnCtaPrimary, ReactiveFormsModule, TranslatePipe, RouterLink, LegalNotes, NgIf],
  templateUrl: './contact.html',
  styleUrl: './contact.scss',
})
export class Contact implements OnDestroy {
  private renderer = inject(Renderer2);

  public contactForm = new FormGroup({
    firstName: new FormControl('', [Validators.required]),
    lastName: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    message: new FormControl('', [Validators.required, Validators.minLength(10)]),
    privacy: new FormControl(false, [Validators.requiredTrue]),
  });

  public isSending = false;
  public showSuccessMessage = false;
  isPrivacyModalOpen = false;

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

  ngOnDestroy() {
    this.renderer.removeClass(document.body, 'no-scroll');
  }

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
