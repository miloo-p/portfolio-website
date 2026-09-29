import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { App } from './app/app';

/**
 * Application entry point. Bootstraps the standalone root component
 * with the global application configuration.
 */
bootstrapApplication(App, appConfig)
  .catch((err) => console.error(err));
