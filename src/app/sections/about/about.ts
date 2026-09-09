import { Component } from '@angular/core';
import { BtnCtaPrimary } from '../../shared/components/btn-cta-primary/btn-cta-primary';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-about',
  imports: [BtnCtaPrimary, TranslatePipe],
  templateUrl: './about.html',
  styleUrl: './about.scss',
})
export class About {}
