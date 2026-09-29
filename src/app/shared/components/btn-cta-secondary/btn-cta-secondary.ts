import { Component, input } from '@angular/core';
import { scrollBehavior } from '../../utils/motion';

/**
 * Secondary call-to-action link to an in-page anchor or an external URL.
 * Rendered as a real `<a>` so middle click, context menu and link semantics work.
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
   * Whether the link points to an in-page anchor.
   *
   * @returns `true` if {@link btnUrl} starts with `#`.
   */
  isAnchor(): boolean {
    return this.btnUrl().startsWith('#');
  }

  /**
   * Scrolls to in-page anchors instead of navigating. External URLs are left to the
   * browser, which opens them in a new tab via `target="_blank"`.
   *
   * @param event - The click event of the link.
   */
  onClick(event: Event) {
    if (!this.isAnchor()) {
      return;
    }

    event.preventDefault();
    const targetElement = document.querySelector(this.btnUrl());
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: scrollBehavior() });
    }
  }
}
