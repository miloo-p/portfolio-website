import { Routes } from '@angular/router';
import { LandingPage } from './pages/landing-page/landing-page';
import { Imprint } from './pages/imprint/imprint';
import { LegalNotes } from './pages/legal-notes/legal-notes';

export const routes: Routes = [
  { path: '', component: LandingPage },
  { path: 'imprint', component: Imprint },
  { path: 'legal', component: LegalNotes },
];
