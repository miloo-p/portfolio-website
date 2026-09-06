import { Component } from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { BtnCtaPrimary } from '../../shared/components/btn-cta-primary/btn-cta-primary';

@Component({
  selector: 'app-contact',
  imports: [BtnCtaPrimary, ReactiveFormsModule],
  templateUrl: './contact.html',
  styleUrl: './contact.scss',
})
export class Contact {
  public contactForm = new FormGroup({
    firstName: new FormControl('', [Validators.required]),
    lastName: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    message: new FormControl('', [Validators.required, Validators.minLength(10)]),
    privacy: new FormControl(false, [Validators.requiredTrue]),
  });

  public isSending = false;
  public showSuccessMessage = false;

  async onSubmit() {
    if (this.contactForm.invalid) {
      this.contactForm.markAllAsTouched();
      return;
    }

    this.isSending = true;
    const formValues = this.contactForm.value;
    const fullName = `${formValues.firstName} ${formValues.lastName}`;

    try {
      const response = await fetch('https://timo-boening.de/sendMail.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: fullName,
          email: formValues.email,
          message: formValues.message,
        }),
      });

      const result = await response.json();

      if (result.success) {
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
}
