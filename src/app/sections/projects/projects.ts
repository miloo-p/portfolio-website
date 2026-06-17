import { Component, ElementRef, ViewChild, AfterViewInit, OnInit } from '@angular/core';

interface Project {
  name: string;
  iconUrl: string;
}

@Component({
  selector: 'app-projects',
  imports: [],
  templateUrl: './projects.html',
  styleUrl: './projects.scss',
})
export class Projects implements OnInit, AfterViewInit {
  @ViewChild('scrollGrid') scrollGrid!: ElementRef<HTMLDivElement>;

  public currentActiveIndex: number = 0;

  public myProjects: Project[] = [
    { name: 'PokeDex', iconUrl: 'assets/images/project-thumbnails/project-thumbnail-1.png' },
    { name: 'Join', iconUrl: 'assets/images/project-thumbnails/project-thumbnail-1.png' },
    { name: 'Light & Dark', iconUrl: 'assets/images/project-thumbnails/project-thumbnail-1.png' },
    { name: 'Videoflix', iconUrl: 'assets/images/project-thumbnails/project-thumbnail-1.png' },
    { name: 'KanMind', iconUrl: 'assets/images/project-thumbnails/project-thumbnail-1.png' },
    { name: 'KanMind', iconUrl: 'assets/images/project-thumbnails/project-thumbnail-1.png' },
    { name: 'KanMind', iconUrl: 'assets/images/project-thumbnails/project-thumbnail-1.png' },
    { name: 'KanMind', iconUrl: 'assets/images/project-thumbnails/project-thumbnail-1.png' },
  ];

  public displayProjects: Project[] = [];
  private baseSetLength: number = 0;

  private animFrameId: number | null = null;
  public isAnimating: boolean = false;

  ngOnInit(): void {
    const baseSet =
      this.myProjects.length % 2 !== 0 ? [...this.myProjects, ...this.myProjects] : this.myProjects;

    this.baseSetLength = baseSet.length;
    this.displayProjects = [...baseSet, ...baseSet, ...baseSet];
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.jumpTo(this.baseSetLength, 'auto');
    }, 10);
  }

  public slideNext(): void {
    if (this.isAnimating) return;
    const currentIndex = this.getClosestIndex();
    this.slideToIndex(currentIndex + 1);
  }

  public slidePrev(): void {
    if (this.isAnimating) return;
    const currentIndex = this.getClosestIndex();
    this.slideToIndex(currentIndex - 1);
  }

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

  public onWheel(event: WheelEvent): void {
    event.preventDefault();
    if (this.isAnimating) return;

    if (event.deltaY > 0) {
      this.slideNext();
    } else if (event.deltaY < 0) {
      this.slidePrev();
    }
  }

  public onScroll(): void {
    if (this.isAnimating) return;

    const closestIndex = this.getClosestIndex();
    const realIndex = closestIndex % this.myProjects.length;

    if (this.currentActiveIndex !== realIndex) {
      this.currentActiveIndex = realIndex;
    }
  }

  public onScrollEnd(): void {
    if (this.isAnimating) return;

    const closestIndex = this.getClosestIndex();
    if (closestIndex < this.baseSetLength || closestIndex >= this.baseSetLength * 2) {
      const indexInMiddleSet = (closestIndex % this.baseSetLength) + this.baseSetLength;
      this.jumpTo(indexInMiddleSet, 'auto');
    }
  }

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
      }
    };

    this.animFrameId = requestAnimationFrame(animate);
  }

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
