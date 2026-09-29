import { Component, signal } from '@angular/core';
import { Header } from './layout/header/header';
import { RouterOutlet } from '@angular/router';
import { Footer } from './layout/footer/footer';

@Component({
  selector: 'app-root',
  imports: [Header, RouterOutlet, Footer],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  protected readonly title = signal('personal-portfolio');
}
