import { Component, HostListener, signal, inject, Renderer2, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PageNavigation } from '../../shared/components/page-navigation/page-navigation';
import { BtnCtaPrimary } from '../../shared/components/btn-cta-primary/btn-cta-primary';
import { Router } from '@angular/router';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';

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

  isMenuOpen = signal(false);
  currentLanguage = signal<'de' | 'en'>('de');

  constructor() {
    const savedLanguage = localStorage.getItem('language');
    if (savedLanguage === 'de' || savedLanguage === 'en') {
      this.currentLanguage.set(savedLanguage);
      this.translateService.use(savedLanguage);
    }
  }

  toggleMenu() {
    this.isMenuOpen.update((val) => {
      const next = !val;
      this.updateScrollLock(next);
      return next;
    });
  }

  closeMenu() {
    if (this.isMenuOpen()) {
      this.isMenuOpen.set(false);
      this.updateScrollLock(false);
    }
  }

  private updateScrollLock(lock: boolean) {
    if (lock) {
      this.renderer.addClass(document.body, 'no-scroll');
    } else {
      this.renderer.removeClass(document.body, 'no-scroll');
    }
  }

  @HostListener('window:resize')
  onResize() {
    if (window.innerWidth > 1200 && this.isMenuOpen()) {
      this.closeMenu();
    }
  }

  goToHome() {
    this.closeMenu();
    this.router.navigate(['/']);
  }

  changeLanguage(language: 'de' | 'en', event: Event): void {
    event.preventDefault();
    if (this.currentLanguage() === language) {
      return;
    }

    this.currentLanguage.set(language);
    localStorage.setItem('language', language);
    this.translateService.use(language);
  }

  ngOnDestroy() {
    this.updateScrollLock(false);
  }
}
