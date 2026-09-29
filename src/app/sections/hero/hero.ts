import { Component } from '@angular/core';
import { BtnCtaPrimary } from '../../shared/components/btn-cta-primary/btn-cta-primary';
import { BtnCtaSecondary } from '../../shared/components/btn-cta-secondary/btn-cta-secondary';
import { TranslatePipe } from '@ngx-translate/core';

/**
 * Hero section with name, short introduction and call-to-action buttons
 * linking to the projects and GitHub.
 */
@Component({
  selector: 'app-hero',
  imports: [BtnCtaPrimary, BtnCtaSecondary, TranslatePipe],
  templateUrl: './hero.html',
  styleUrl: './hero.scss',
})
export class Hero {}
