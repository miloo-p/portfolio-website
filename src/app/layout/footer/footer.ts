import { Component, inject } from '@angular/core';
import { FooterWoodscene } from '../../shared/components/footer-woodscene/footer-woodscene';
import { Router, RouterLink } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';

/**
 * Global page footer with contact links, social links and legal navigation.
 */
@Component({
  selector: 'app-footer',
  imports: [FooterWoodscene, RouterLink, TranslatePipe],
  templateUrl: './footer.html',
  styleUrl: './footer.scss',
})
export class Footer {
  private router = inject(Router);

  /**
   * Navigates to the landing page. Lets keyboard users activate the logo link with Enter.
   */
  goToHome() {
    this.router.navigate(['/']);
  }
}
