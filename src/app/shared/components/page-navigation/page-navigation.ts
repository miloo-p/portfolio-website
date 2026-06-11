import { Component, HostListener, signal } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-page-navigation',
  imports: [RouterLink],
  templateUrl: './page-navigation.html',
  styleUrl: './page-navigation.scss',
})
export class PageNavigation {
  isResizing = signal(false);

  private resizeTimer: any;

  @HostListener('window:resize')
  onResize() {
    this.isResizing.set(true);

    clearTimeout(this.resizeTimer);

    this.resizeTimer = setTimeout(() => {
      this.isResizing.set(false);
    }, 200);
  }
}
