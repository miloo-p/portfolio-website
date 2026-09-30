import { Component, ElementRef, signal, ViewChild } from '@angular/core';
import { Header } from './layout/header/header';
import { RouterOutlet } from '@angular/router';
import { Footer } from './layout/footer/footer';
import { TranslatePipe } from '@ngx-translate/core';

/**
 * Root component of the application.
 * Renders a skip link and the global header and footer around the routed page content.
 */
@Component({
  selector: 'app-root',
  imports: [Header, RouterOutlet, Footer, TranslatePipe],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  /** Application title. */
  protected readonly title = signal('personal-portfolio');

  @ViewChild('main') private main?: ElementRef<HTMLElement>;

  /**
   * Moves keyboard focus past the header to the main content.
   * Handled in code because `href="#main"` would resolve against `<base href="/">`
   * and navigate away from sub pages.
   *
   * @param event - The click event of the skip link. Its default action is prevented.
   */
  skipToMain(event: Event) {
    event.preventDefault();
    this.main?.nativeElement.focus();
  }
}
