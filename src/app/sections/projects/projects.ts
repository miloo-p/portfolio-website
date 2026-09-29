import { Component, ElementRef, ViewChild, AfterViewInit, OnInit } from '@angular/core';
import { BtnCtaPrimary } from '../../shared/components/btn-cta-primary/btn-cta-primary';
import { BtnCtaSecondary } from '../../shared/components/btn-cta-secondary/btn-cta-secondary';
import { TranslatePipe } from '@ngx-translate/core';

/**
 * A portfolio project shown in the carousel.
 */
interface Project {
  /** Translation key of the project name. */
  name: string;
  /** Translation key of the project description. */
  description: string;
  /** Technologies used in the project. */
  techStack: string[];
  /** URL of the live demo. If empty, the project is shown as work in progress. */
  liveUrl: string;
  /** Path to the project thumbnail. */
  iconUrl: string;
  /** URL of the GitHub repository. */
  gitUrl: string;
}

/**
 * Projects section with an infinite, horizontally scrolling carousel.
 *
 * The infinite loop works by rendering the project list three times. Whenever
 * scrolling ends in the first or last copy, the carousel silently jumps to the
 * matching card in the middle copy.
 */
@Component({
  selector: 'app-projects',
  imports: [BtnCtaPrimary, BtnCtaSecondary, TranslatePipe],
  templateUrl: './projects.html',
  styleUrl: './projects.scss',
})
export class Projects implements OnInit, AfterViewInit {
  /** The horizontally scrollable carousel container. */
  @ViewChild('scrollGrid') scrollGrid!: ElementRef<HTMLDivElement>;

  /** Index of the active project in {@link myProjects}. Used to highlight the card and navigation dot. */
  public currentActiveIndex: number = 0;

  /** The projects to showcase. */
  public myProjects: Project[] = [
    {
      name: 'PROJECTS.ITEMS.JOIN.NAME',
      iconUrl: 'assets/images/project-thumbnails/project_join.webp',
      description: 'PROJECTS.ITEMS.JOIN.DESCRIPTION',
      techStack: ['Angular', 'TypeScript', 'SCSS'],
      liveUrl: 'https://join.timo-boening.de',
      gitUrl: 'https://github.com/miloo-p/join-app',
    },
    {
      name: 'PROJECTS.ITEMS.LIGHT_DARK.NAME',
      iconUrl: 'assets/images/project-thumbnails/project_light-shadow.webp',
      description: 'PROJECTS.ITEMS.LIGHT_DARK.DESCRIPTION',
      techStack: ['JavaScript', 'HTML5 Canvas', 'OOP'],
      liveUrl: 'https://light-and-dark.timo-boening.de',
      gitUrl: 'https://github.com/miloo-p/light-and-dark',
    },
    {
      name: 'PROJECTS.ITEMS.POKEDEX.NAME',
      iconUrl: 'assets/images/project-thumbnails/project_pokedex.webp',
      description: 'PROJECTS.ITEMS.POKEDEX.DESCRIPTION',
      techStack: ['JavaScript', 'REST-API', 'HTML/CSS'],
      liveUrl: 'https://pokedex.timo-boening.de',
      gitUrl: 'https://github.com/miloo-p/da-pokedex',
    },
    /*     {
      name: 'PROJECTS.ITEMS.KANMIND.NAME',
      iconUrl: 'assets/images/project-thumbnails/project_soon.webp',
      description: 'PROJECTS.ITEMS.KANMIND.DESCRIPTION',
      techStack: ['Python', 'Django', 'REST-API'],
      liveUrl: '',
      gitUrl: '',
    }, */
    {
      name: 'PROJECTS.ITEMS.INCUSYNC.NAME',
      iconUrl: 'assets/images/project-thumbnails/project_soon.webp',
      description: 'PROJECTS.ITEMS.INCUSYNC.DESCRIPTION',
      techStack: ['Angular', 'TypeScript', 'SCSS'],
      liveUrl: 'https://miloo-p.github.io/incu-sync/',
      gitUrl: 'https://github.com/miloo-p/incu-sync/blob/main/README.md',
    },
  ];

  /** The rendered cards: the base set repeated three times for the infinite loop. */
  public displayProjects: Project[] = [];
  /** Number of cards in one copy of the base set. */
  private baseSetLength: number = 0;

  /** ID of the running scroll animation frame, if any. */
  private animFrameId: number | null = null;
  /** True while a programmatic scroll animation is running. */
  public isAnimating: boolean = false;

  /**
   * Builds {@link displayProjects}. An odd project count is doubled first
   * so the alternating card offset stays consistent across the copies.
   */
  ngOnInit(): void {
    const baseSet =
      this.myProjects.length % 2 !== 0 ? [...this.myProjects, ...this.myProjects] : this.myProjects;

    this.baseSetLength = baseSet.length;
    this.displayProjects = [...baseSet, ...baseSet, ...baseSet];
  }

  /**
   * Centers the first card of the middle copy once the cards have been rendered.
   */
  ngAfterViewInit(): void {
    setTimeout(() => {
      this.jumpTo(this.baseSetLength, 'auto');
    }, 10);
  }

  /**
   * Slides to the next card. Ignored while an animation is running.
   */
  public slideNext(): void {
    if (this.isAnimating) return;
    const currentIndex = this.getClosestIndex();
    this.slideToIndex(currentIndex + 1);
  }

  /**
   * Slides to the previous card. Ignored while an animation is running.
   */
  public slidePrev(): void {
    if (this.isAnimating) return;
    const currentIndex = this.getClosestIndex();
    this.slideToIndex(currentIndex - 1);
  }

  /**
   * Slides to a specific project, choosing the copy of its card closest to the
   * current scroll position. Ignored while an animation is running.
   *
   * @param realIndex - Index of the project in {@link myProjects}.
   */
  public scrollToProject(realIndex: number): void {
    if (this.isAnimating) return;
    this.currentActiveIndex = realIndex;

    const grid = this.scrollGrid.nativeElement;
    const scrollCenter = grid.scrollLeft + grid.clientWidth / 2;

    let bestIndex = 0;
    let minDistance = Infinity;

    this.displayProjects.forEach((_, index) => {
      if (index % this.myProjects.length === realIndex) {
        const item = grid.children[index] as HTMLElement;
        if (item) {
          const itemCenter = item.offsetLeft + item.clientWidth / 2;
          const distance = Math.abs(scrollCenter - itemCenter);
          if (distance < minDistance) {
            minDistance = distance;
            bestIndex = index;
          }
        }
      }
    });

    this.slideToIndex(bestIndex);
  }

  /**
   * Updates {@link currentActiveIndex} to the card closest to the center while the user scrolls.
   */
  public onScroll(): void {
    if (this.isAnimating) return;

    const closestIndex = this.getClosestIndex();
    const realIndex = closestIndex % this.myProjects.length;

    if (this.currentActiveIndex !== realIndex) {
      this.currentActiveIndex = realIndex;
    }
  }

  /**
   * Keeps the loop infinite: when scrolling stops in the first or last copy,
   * jumps without animation to the same card in the middle copy.
   */
  public onScrollEnd(): void {
    if (this.isAnimating) return;

    const closestIndex = this.getClosestIndex();
    if (closestIndex < this.baseSetLength || closestIndex >= this.baseSetLength * 2) {
      const indexInMiddleSet = (closestIndex % this.baseSetLength) + this.baseSetLength;
      this.jumpTo(indexInMiddleSet, 'auto');
    }
  }

  /**
   * Centers the card at the given index with an animated scroll.
   * Out-of-range indices are ignored.
   *
   * @param index - Index of the card in {@link displayProjects}.
   */
  private slideToIndex(index: number): void {
    const grid = this.scrollGrid.nativeElement;
    if (index < 0 || index >= grid.children.length) return;

    const targetItem = grid.children[index] as HTMLElement;
    if (!targetItem) return;

    this.currentActiveIndex = index % this.myProjects.length;

    const targetScrollLeft =
      targetItem.offsetLeft - grid.clientWidth / 2 + targetItem.clientWidth / 2;

    this.animateToPosition(targetScrollLeft, 450);
  }

  /**
   * Scrolls the carousel to a horizontal position with an ease-in-out animation.
   * Scroll snapping is disabled during the animation and re-enabled afterwards.
   * A running animation is cancelled first.
   *
   * @param targetLeft - Target `scrollLeft` value in pixels.
   * @param duration - Animation duration in milliseconds.
   */
  private animateToPosition(targetLeft: number, duration: number): void {
    const grid = this.scrollGrid.nativeElement;

    if (this.animFrameId) {
      cancelAnimationFrame(this.animFrameId);
    }

    this.isAnimating = true;
    grid.style.scrollSnapType = 'none';

    const startLeft = grid.scrollLeft;
    const distance = targetLeft - startLeft;
    let startTime: number | null = null;

    const easeInOutCubic = (t: number) =>
      t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;

    const animate = (currentTime: number) => {
      if (startTime === null) startTime = currentTime;
      const timeElapsed = currentTime - startTime;
      const progress = Math.min(timeElapsed / duration, 1);

      grid.scrollLeft = startLeft + distance * easeInOutCubic(progress);

      if (progress < 1) {
        this.animFrameId = requestAnimationFrame(animate);
      } else {
        grid.style.scrollSnapType = 'x mandatory';
        this.isAnimating = false;
        this.animFrameId = null;
        this.onScroll();
        this.onScrollEnd();
      }
    };

    this.animFrameId = requestAnimationFrame(animate);
  }

  /**
   * Finds the card whose center is closest to the center of the carousel.
   *
   * @returns Index of that card in {@link displayProjects}.
   */
  private getClosestIndex(): number {
    const grid = this.scrollGrid.nativeElement;
    const scrollCenter = grid.scrollLeft + grid.clientWidth / 2;
    let closestIndex = 0;
    let minDistance = Infinity;

    Array.from(grid.children).forEach((child: Element, index: number) => {
      const item = child as HTMLElement;
      const itemCenter = item.offsetLeft + item.clientWidth / 2;
      const distance = Math.abs(scrollCenter - itemCenter);

      if (distance < minDistance) {
        minDistance = distance;
        closestIndex = index;
      }
    });
    return closestIndex;
  }

  /**
   * Centers the card at the given index using the native `scrollTo`.
   *
   * @param index - Index of the card in {@link displayProjects}.
   * @param behavior - Scroll behavior, e.g. `'auto'` for an instant jump.
   */
  private jumpTo(index: number, behavior: ScrollBehavior): void {
    const grid = this.scrollGrid.nativeElement;
    const targetItem = grid.children[index] as HTMLElement;

    if (targetItem) {
      const scrollPosition =
        targetItem.offsetLeft - grid.clientWidth / 2 + targetItem.clientWidth / 2;
      grid.scrollTo({ left: scrollPosition, behavior });
    }
  }
}
