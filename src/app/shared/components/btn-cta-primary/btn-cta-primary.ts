import { Component, input } from '@angular/core';

@Component({
  selector: 'app-btn-cta-primary',
  imports: [],
  templateUrl: './btn-cta-primary.html',
  styleUrl: './btn-cta-primary.scss',
})
export class BtnCtaPrimary {
  btnText = input.required<string>();
  btnUrl = input.required<string>();

  goToLink(url: string) {
    if (url.startsWith('#')) {
      const targetElement = document.querySelector(url);
      if (targetElement) {
        targetElement.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      // Externer Link: Öffnet im neuen Tab
      window.open(url, '_blank');
    }
  }
}
