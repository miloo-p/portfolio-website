import { Component } from '@angular/core';
import { PageNavigation } from '../../shared/components/page-navigation/page-navigation';
import { BtnCtaPrimary } from '../../shared/components/btn-cta-primary/btn-cta-primary';

@Component({
  selector: 'app-header',
  imports: [PageNavigation, BtnCtaPrimary],
  templateUrl: './header.html',
  styleUrl: './header.scss',
})
export class Header {}
