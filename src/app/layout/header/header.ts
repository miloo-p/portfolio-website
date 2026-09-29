import { Component, HostListener, signal, inject, Renderer2, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PageNavigation } from '../../shared/components/page-navigation/page-navigation';
import { BtnCtaPrimary } from '../../shared/components/btn-cta-primary/btn-cta-primary';
import { Router } from '@angular/router';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';

/**
 * Global page header with logo, section navigation, language switch
 * and a burger menu for smaller screens.
 */
@Component({
  selector: 'app-header',
  imports: [CommonModule, PageNavigation, BtnCtaPrimary, TranslatePipe],
  templateUrl: './header.html',
  styleUrl: './header.scss',
})
export class Header implements OnDestroy {
  private router = inject(Router);
  private translateService = inject(TranslateService);
  private renderer = inject(Renderer2);

  /** Whether the mobile menu is open. */
  isMenuOpen = signal(false);
  /** Currently active UI language. */
  currentLanguage = signal<'de' | 'en'>('de');

  /**
   * Restores the language saved in `localStorage` from a previous visit, if any.
   */
  constructor() {
    const savedLanguage = localStorage.getItem('language');
    if (savedLanguage === 'de' || savedLanguage === 'en') {
      this.currentLanguage.set(savedLanguage);
      this.translateService.use(savedLanguage);
    }
  }

  /**
   * Opens or closes the mobile menu and locks page scrolling while it is open.
   */
  toggleMenu() {
    this.isMenuOpen.update((val) => {
      const next = !val;
      this.updateScrollLock(next);
      return next;
    });
  }

  /**
   * Closes the mobile menu, if open, and releases the scroll lock.
   */
  closeMenu() {
    if (this.isMenuOpen()) {
      this.isMenuOpen.set(false);
      this.updateScrollLock(false);
    }
  }

  /**
   * Adds or removes the `no-scroll` class on `<body>`.
   *
   * @param lock - `true` to prevent page scrolling, `false` to allow it again.
   */
  private updateScrollLock(lock: boolean) {
    if (lock) {
      this.renderer.addClass(document.body, 'no-scroll');
    } else {
      this.renderer.removeClass(document.body, 'no-scroll');
    }
  }

  /**
   * Closes the mobile menu when the window grows beyond 1200 px,
   * where the desktop navigation is shown instead.
   */
  @HostListener('window:resize')
  onResize() {
    if (window.innerWidth > 1200 && this.isMenuOpen()) {
      this.closeMenu();
    }
  }

  /**
   * Closes the mobile menu and navigates to the landing page.
   */
  goToHome() {
    this.closeMenu();
    this.router.navigate(['/']);
  }

  /**
   * Switches the UI language and saves the choice in `localStorage`.
   *
   * @param language - The language to activate.
   * @param event - The triggering click event. Its default action is prevented.
   */
  changeLanguage(language: 'de' | 'en', event: Event): void {
    event.preventDefault();
    if (this.currentLanguage() === language) {
      return;
    }

    this.currentLanguage.set(language);
    localStorage.setItem('language', language);
    this.translateService.use(language);
  }

  /**
   * Releases the scroll lock so the page stays scrollable after the header is destroyed.
   */
  ngOnDestroy() {
    this.updateScrollLock(false);
  }
}
