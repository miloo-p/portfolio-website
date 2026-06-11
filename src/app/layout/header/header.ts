import { Component } from '@angular/core';
import { PageNavigation } from '../../shared/components/page-navigation/page-navigation';

@Component({
  selector: 'app-header',
  imports: [PageNavigation],
  templateUrl: './header.html',
  styleUrl: './header.scss',
})
export class Header {}
