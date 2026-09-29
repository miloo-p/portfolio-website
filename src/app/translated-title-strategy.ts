import { Injectable, inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { Meta, Title } from '@angular/platform-browser';
import { ActivatedRouteSnapshot, RouterStateSnapshot, TitleStrategy } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { Subscription } from 'rxjs';

/**
 * Updates the page head after each navigation:
 * - sets the document title from the route's `title`, treated as a translation key
 *   (it follows language changes; routes without a title use the default site title),
 * - points the canonical link at the current path on the main domain,
 * - adds `noindex` for routes with `data: { noindex: true }`.
 */
@Injectable({ providedIn: 'root' })
export class TranslatedTitleStrategy extends TitleStrategy {
  private title = inject(Title);
  private meta = inject(Meta);
  private document = inject(DOCUMENT);
  private translateService = inject(TranslateService);
  private subscription?: Subscription;

  /** Title of the landing page and fallback for routes without a title. */
  private readonly defaultTitle = 'Timo Böning – Frontend Developer | Portfolio';
  /** Main domain used for canonical URLs (www redirects here). */
  private readonly siteUrl = 'https://timo-boening.de';

  /**
   * Updates title, canonical link and robots meta tag after each navigation.
   *
   * @param snapshot - The router state of the finished navigation.
   */
  override updateTitle(snapshot: RouterStateSnapshot): void {
    this.updateCanonical(snapshot.url);
    this.updateRobots(snapshot.root);

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

  /**
   * Sets the canonical link to the given URL without query and fragment.
   *
   * @param url - The router URL of the current navigation.
   */
  private updateCanonical(url: string) {
    const path = url.split(/[?#]/)[0];
    let link = this.document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');

    if (!link) {
      link = this.document.createElement('link');
      link.rel = 'canonical';
      this.document.head.appendChild(link);
    }
    link.href = this.siteUrl + (path === '/' ? '/' : path);
  }

  /**
   * Adds `noindex` if any route in the active branch has `data.noindex`, otherwise removes it.
   *
   * @param route - The root of the activated route tree.
   */
  private updateRobots(route: ActivatedRouteSnapshot) {
    let noindex = false;
    for (let current: ActivatedRouteSnapshot | null = route; current; current = current.firstChild) {
      noindex ||= current.data['noindex'] === true;
    }

    if (noindex) {
      this.meta.updateTag({ name: 'robots', content: 'noindex, follow' });
    } else {
      this.meta.removeTag('name="robots"');
    }
  }
}
