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

  // Deine echten Projekte
  public myProjects: Project[] = [
    { name: 'PokeDex', iconUrl: 'assets/images/project-thumbnails/project-thumbnail-1.png' },
    { name: 'Join', iconUrl: 'assets/images/project-thumbnails/project-thumbnail-1.png' },
    { name: 'Light & Dark', iconUrl: 'assets/images/project-thumbnails/project-thumbnail-1.png' },
    { name: 'Videoflix', iconUrl: 'assets/images/project-thumbnails/project-thumbnail-1.png' },
    { name: 'KanMind', iconUrl: 'assets/images/project-thumbnails/project-thumbnail-1.png' },
  ];

  public displayProjects: Project[] = [];
  private baseSetLength: number = 0;

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

  public scrollToProject(realIndex: number): void {
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

    this.jumpTo(bestIndex, 'smooth');
  }

  public onScroll(): void {
    const closestIndex = this.getClosestIndex();
    const realIndex = closestIndex % this.myProjects.length;

    if (this.currentActiveIndex !== realIndex) {
      this.currentActiveIndex = realIndex;
    }
  }

  public onScrollEnd(): void {
    const closestIndex = this.getClosestIndex();

    // Wenn wir das mittlere Set verlassen haben...
    if (closestIndex < this.baseSetLength || closestIndex >= this.baseSetLength * 2) {
      const indexInMiddleSet = (closestIndex % this.baseSetLength) + this.baseSetLength;
      this.jumpTo(indexInMiddleSet, 'auto');
    }
  }

  // --- Hilfsmethoden ---

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
