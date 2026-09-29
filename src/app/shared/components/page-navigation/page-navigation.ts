import { Component, HostListener, signal, Output, EventEmitter } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';

/**
 * Section navigation used in the header and the mobile menu.
 */
@Component({
  selector: 'app-page-navigation',
  imports: [RouterLink, TranslatePipe],
  templateUrl: './page-navigation.html',
  styleUrl: './page-navigation.scss',
})
export class PageNavigation {
  /** True while the window is being resized. Used to suppress transitions during resizing. */
  isResizing = signal(false);
  private resizeTimer: any;

  /** Emits when a navigation link was clicked, so the parent can close the mobile menu. */
  @Output() linkClicked = new EventEmitter<void>();

  /**
   * Notifies the parent that a link was clicked.
   */
  closeMenu() {
    this.linkClicked.emit();
  }

  /**
   * Sets {@link isResizing} while the window is being resized
   * and resets it 200 ms after the last resize event.
   */
  @HostListener('window:resize')
  onResize() {
    this.isResizing.set(true);
    clearTimeout(this.resizeTimer);
    this.resizeTimer = setTimeout(() => {
      this.isResizing.set(false);
    }, 200);
  }
}
