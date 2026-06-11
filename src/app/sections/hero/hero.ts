import { Component } from '@angular/core';
import { BtnCtaPrimary } from '../../shared/components/btn-cta-primary/btn-cta-primary';
import { BtnCtaSecondary } from '../../shared/components/btn-cta-secondary/btn-cta-secondary';

@Component({
  selector: 'app-hero',
  imports: [BtnCtaPrimary, BtnCtaSecondary],
  templateUrl: './hero.html',
  styleUrl: './hero.scss',
})
export class Hero {}
