import { Component, inject, input } from '@angular/core';
import { Router } from '@angular/router';

/**
 * Primary call-to-action button. Links to an in-page anchor or an external URL,
 * or acts as a form submit button.
 */
@Component({
  selector: 'app-btn-cta-primary',
  imports: [],
  templateUrl: './btn-cta-primary.html',
  styleUrl: './btn-cta-primary.scss',
})
export class BtnCtaPrimary {
  private router = inject(Router);
  /** Label displayed on the button. */
  btnText = input.required<string>();
  /** Link target: an anchor selector starting with `#` or an absolute URL. */
  btnUrl = input.required<string>();
  /** Native button type. Use `'submit'` inside forms. */
  btnType = input<'button' | 'submit'>('button');
  /** Whether the button is disabled. */
  disabled = input(false);
  /** Whether the button can be reached with Tab. Set to `false` for hidden duplicates. */
  tabbable = input(true);

  /**
   * Smoothly scrolls to an in-page anchor or opens an external URL in a new tab.
   * If the anchor is not on the current page, navigates to the landing page
   * and scrolls to the matching fragment there.
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
      } else {
        this.router.navigate(['/'], { fragment: url.slice(1) });
      }
    } else {
      window.open(url, '_blank');
    }
  }
}
