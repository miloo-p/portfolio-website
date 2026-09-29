import { ApplicationConfig, provideBrowserGlobalErrorListeners, inject } from '@angular/core';
import { provideRouter, TitleStrategy, withInMemoryScrolling } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { provideTranslateService, TranslateService } from '@ngx-translate/core';
import { provideTranslateHttpLoader } from '@ngx-translate/http-loader';

import { routes } from './app.routes';
import { TranslatedTitleStrategy } from './translated-title-strategy';

/**
 * Global application configuration.
 *
 * Registers the router (with anchor scrolling and scroll position restoration),
 * the HTTP client and ngx-translate, which loads its translation files from
 * `assets/i18n/` with German as default and English as fallback language.
 */
export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(
      routes,
      withInMemoryScrolling({
        anchorScrolling: 'enabled',
        scrollPositionRestoration: 'enabled',
      }),
    ),
    { provide: TitleStrategy, useClass: TranslatedTitleStrategy },
    provideHttpClient(),
    provideTranslateService({
      lang: 'de',
      fallbackLang: 'en',
      loader: provideTranslateHttpLoader({
        prefix: './assets/i18n/',
        suffix: '.json',
      }),
    }),
  ],
};
