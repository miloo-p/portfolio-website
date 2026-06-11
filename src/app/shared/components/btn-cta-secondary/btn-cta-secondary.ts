import { Component, input } from '@angular/core';

@Component({
  selector: 'app-btn-cta-secondary',
  imports: [],
  templateUrl: './btn-cta-secondary.html',
  styleUrl: './btn-cta-secondary.scss',
})
export class BtnCtaSecondary {
  btnText = input.required<string>();
}
