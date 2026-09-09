import { Component } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-imprint',
  imports: [TranslatePipe],
  templateUrl: './imprint.html',
  styleUrl: './imprint.scss',
})
export class Imprint {}
