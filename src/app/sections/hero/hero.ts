import { Component } from '@angular/core';
import { BtnCtaPrimary } from '../../shared/components/btn-cta-primary/btn-cta-primary';
import { BtnCtaSecondary } from '../../shared/components/btn-cta-secondary/btn-cta-secondary';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-hero',
  imports: [BtnCtaPrimary, BtnCtaSecondary, TranslatePipe],
  templateUrl: './hero.html',
  styleUrl: './hero.scss',
})
export class Hero {}
