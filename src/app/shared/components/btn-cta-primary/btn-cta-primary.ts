import { Component, inject, input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-btn-cta-primary',
  imports: [],
  templateUrl: './btn-cta-primary.html',
  styleUrl: './btn-cta-primary.scss',
})
export class BtnCtaPrimary {
  private router = inject(Router);
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
      } else {
        this.router.navigate(['/'], { fragment: url.slice(1) });
      }
    } else {
      window.open(url, '_blank');
    }
  }
}
