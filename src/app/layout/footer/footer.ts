import { Component } from '@angular/core';
import { FooterWoodscene } from '../../shared/components/footer-woodscene/footer-woodscene';
import { RouterLink } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';

/**
 * Global page footer with contact links, social links and legal navigation.
 */
@Component({
  selector: 'app-footer',
  imports: [FooterWoodscene, RouterLink, TranslatePipe],
  templateUrl: './footer.html',
  styleUrl: './footer.scss',
})
export class Footer {
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
