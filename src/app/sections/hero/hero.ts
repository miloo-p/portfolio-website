import { Component, DestroyRef, ElementRef, inject, signal, viewChild } from '@angular/core';
import { BtnCtaPrimary } from '../../shared/components/btn-cta-primary/btn-cta-primary';
import { BtnCtaSecondary } from '../../shared/components/btn-cta-secondary/btn-cta-secondary';
import { TranslatePipe } from '@ngx-translate/core';

const HIDE_RADIUS = 0.45;
const SHOW_RADIUS = 0.7;

/**
 * Hero section with name, short introduction and call-to-action buttons
 * linking to the projects and GitHub. The bear hides behind the portrait
 * when the mouse gets close.
 */
@Component({
  selector: 'app-hero',
  imports: [BtnCtaPrimary, BtnCtaSecondary, TranslatePipe],
  templateUrl: './hero.html',
  styleUrl: './hero.scss',
  host: {
    '(pointermove)': 'onPointerMove($event)',
    '(pointerleave)': 'bearHiding.set(false)',
  },
})
export class Hero {
  private readonly bear = viewChild.required<ElementRef<SVGSVGElement>>('bear');
  protected readonly bearHiding = signal(false);
  private frame = 0;

  constructor() {
    inject(DestroyRef).onDestroy(() => cancelAnimationFrame(this.frame));
  }

  protected onPointerMove(event: PointerEvent): void {
    if (event.pointerType !== 'mouse' || this.frame) return;

    const { clientX, clientY } = event;
    this.frame = requestAnimationFrame(() => {
      this.frame = 0;
      const rect = this.bear().nativeElement.getBoundingClientRect();
      const size = Math.max(rect.width, rect.height);
      const distance = Math.hypot(
        clientX - (rect.left + rect.width / 2),
        clientY - (rect.top + rect.height / 2),
      );
      const threshold = (this.bearHiding() ? SHOW_RADIUS : HIDE_RADIUS) * size;
      this.bearHiding.set(distance < threshold);
    });
  }
}
