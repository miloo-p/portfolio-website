import { Component, input } from '@angular/core';

/**
 * Secondary call-to-action button that links to an in-page anchor or an external URL.
 */
@Component({
  selector: 'app-btn-cta-secondary',
  imports: [],
  templateUrl: './btn-cta-secondary.html',
  styleUrl: './btn-cta-secondary.scss',
})
export class BtnCtaSecondary {
  /** Label displayed on the button. */
  btnText = input.required<string>();
  /** Link target: an anchor selector starting with `#` or an absolute URL. */
  btnUrl = input.required<string>();
  /** Whether the button can be reached with Tab. Set to `false` for hidden duplicates. */
  tabbable = input(true);

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
