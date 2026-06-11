import { Component } from '@angular/core';
import { BearLogo } from '../../shared/components/bear-logo/bear-logo';

@Component({
  selector: 'app-header',
  imports: [BearLogo],
  templateUrl: './header.html',
  styleUrl: './header.scss',
})
export class Header {}
