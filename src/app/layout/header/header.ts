import { Component, HostListener, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PageNavigation } from '../../shared/components/page-navigation/page-navigation';
import { BtnCtaPrimary } from '../../shared/components/btn-cta-primary/btn-cta-primary';

@Component({
  selector: 'app-header',
  imports: [CommonModule, PageNavigation, BtnCtaPrimary],
  templateUrl: './header.html',
  styleUrl: './header.scss',
})
export class Header {
  isMenuOpen = signal(false);

  toggleMenu() {
    this.isMenuOpen.update((val) => !val);
  }

  // Schließt das Overlay, wenn der Screen wieder Desktop-Größe erreicht
  @HostListener('window:resize')
  onResize() {
    if (window.innerWidth > 1200 && this.isMenuOpen()) {
      this.isMenuOpen.set(false);
    }
  }
}
