import { Injectable, inject } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { RouterStateSnapshot, TitleStrategy } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { Subscription } from 'rxjs';

/**
 * Sets the document title from the route's `title`, treated as a translation key.
 * The title follows language changes. Routes without a title use the default site title.
 */
@Injectable({ providedIn: 'root' })
export class TranslatedTitleStrategy extends TitleStrategy {
  private title = inject(Title);
  private translateService = inject(TranslateService);
  private subscription?: Subscription;

  /** Title of the landing page and fallback for routes without a title. */
  private readonly defaultTitle = 'Timo Böning - bear in mind.';

  /**
   * Updates the document title after each navigation.
   *
   * @param snapshot - The router state of the finished navigation.
   */
  override updateTitle(snapshot: RouterStateSnapshot): void {
    this.subscription?.unsubscribe();
    const key = this.buildTitle(snapshot);

    if (!key) {
      this.title.setTitle(this.defaultTitle);
      return;
    }

    this.subscription = this.translateService
      .stream(key)
      .subscribe((text: string) => this.title.setTitle(`${text} | Timo Böning`));
  }
}
