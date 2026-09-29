import { Component, signal } from '@angular/core';
import { Header } from './layout/header/header';
import { RouterOutlet } from '@angular/router';
import { Footer } from './layout/footer/footer';

/**
 * Root component of the application.
 * Renders the global header and footer around the routed page content.
 */
@Component({
  selector: 'app-root',
  imports: [Header, RouterOutlet, Footer],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  /** Application title. */
  protected readonly title = signal('personal-portfolio');
}
