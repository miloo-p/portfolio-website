import { Component } from '@angular/core';
import { Hero } from '../../sections/hero/hero';

@Component({
  selector: 'app-landing-page',
  imports: [Hero],
  templateUrl: './landing-page.html',
  styleUrl: './landing-page.scss',
})
export class LandingPage {}
