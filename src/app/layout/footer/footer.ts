import { Component } from '@angular/core';
import { FooterWoodscene } from '../../shared/components/footer-woodscene/footer-woodscene';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-footer',
  imports: [FooterWoodscene, RouterLink],
  templateUrl: './footer.html',
  styleUrl: './footer.scss',
})
export class Footer {
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
