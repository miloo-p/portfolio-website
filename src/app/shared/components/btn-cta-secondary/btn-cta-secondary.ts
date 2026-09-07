import { Component, input } from '@angular/core';

@Component({
  selector: 'app-btn-cta-secondary',
  imports: [],
  templateUrl: './btn-cta-secondary.html',
  styleUrl: './btn-cta-secondary.scss',
})
export class BtnCtaSecondary {
  btnText = input.required<string>();
  btnUrl = input.required<string>();

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
