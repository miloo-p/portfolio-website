import { Component } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';

/**
 * Imprint page with the legally required provider information.
 */
@Component({
  selector: 'app-imprint',
  imports: [TranslatePipe],
  templateUrl: './imprint.html',
  styleUrl: './imprint.scss',
})
export class Imprint {}
