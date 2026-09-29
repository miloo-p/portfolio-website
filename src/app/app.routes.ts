import { Routes } from '@angular/router';
import { LandingPage } from './pages/landing-page/landing-page';
import { Imprint } from './pages/imprint/imprint';
import { LegalNotes } from './pages/legal-notes/legal-notes';

/**
 * Application routes: the landing page, the imprint and the privacy policy.
 */
export const routes: Routes = [
  { path: '', component: LandingPage },
  { path: 'imprint', component: Imprint, title: 'IMPRINT.TITLE', data: { noindex: true } },
  { path: 'legal', component: LegalNotes, title: 'PRIVACY_POLICY.TITLE', data: { noindex: true } },
];
