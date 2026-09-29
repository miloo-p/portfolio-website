import { Component } from '@angular/core';
import { BtnCtaPrimary } from '../../shared/components/btn-cta-primary/btn-cta-primary';
import { TranslatePipe } from '@ngx-translate/core';

/**
 * About section introducing soft and hard skills,
 * illustrated with animated code-editor visuals.
 */
@Component({
  selector: 'app-about',
  imports: [BtnCtaPrimary, TranslatePipe],
  templateUrl: './about.html',
  styleUrl: './about.scss',
})
export class About {}
