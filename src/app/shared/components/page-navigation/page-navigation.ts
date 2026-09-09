import { Component, HostListener, signal, Output, EventEmitter } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-page-navigation',
  imports: [RouterLink, TranslatePipe],
  templateUrl: './page-navigation.html',
  styleUrl: './page-navigation.scss',
})
export class PageNavigation {
  isResizing = signal(false);
  private resizeTimer: any;

  // NEU: Output-Event definieren
  @Output() linkClicked = new EventEmitter<void>();

  // NEU: Methode zum Abfeuern des Events
  closeMenu() {
    this.linkClicked.emit();
  }

  @HostListener('window:resize')
  onResize() {
    this.isResizing.set(true);
    clearTimeout(this.resizeTimer);
    this.resizeTimer = setTimeout(() => {
      this.isResizing.set(false);
    }, 200);
  }
}
