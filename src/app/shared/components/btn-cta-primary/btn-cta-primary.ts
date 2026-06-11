import { Component, input } from '@angular/core';

@Component({
  selector: 'app-btn-cta-primary',
  imports: [],
  templateUrl: './btn-cta-primary.html',
  styleUrl: './btn-cta-primary.scss',
})
export class BtnCtaPrimary {
  btnText = input.required<string>();
}
