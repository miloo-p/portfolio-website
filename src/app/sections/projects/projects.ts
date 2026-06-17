import { Component, ElementRef, ViewChild } from '@angular/core';

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
export class Projects {
  @ViewChild('scrollGrid') scrollGrid!: ElementRef<HTMLDivElement>;

  public currentActiveIndex: number = 0;

  public myProjects: Project[] = [
    { name: 'PokeDex', iconUrl: 'assets/images/project-thumbnails/project-thumbnail-1.png' },
    { name: 'Join', iconUrl: 'assets/images/project-thumbnails/project-thumbnail-1.png' },
    { name: 'Light & Dark', iconUrl: 'assets/images/project-thumbnails/project-thumbnail-1.png' },
    { name: 'Videoflix', iconUrl: 'assets/images/project-thumbnails/project-thumbnail-1.png' },
    { name: 'KanMind', iconUrl: 'assets/images/project-thumbnails/project-thumbnail-1.png' },
  ];

  // ==========================================
  // Klick auf den Dot: Scrollt das Grid
  // ==========================================
  public scrollToProject(index: number): void {
    this.currentActiveIndex = index;

    const grid = this.scrollGrid.nativeElement;
    const targetItem = grid.children[index] as HTMLElement;

    if (targetItem) {
      const scrollPosition =
        targetItem.offsetLeft - grid.clientWidth / 2 + targetItem.clientWidth / 2;

      grid.scrollTo({
        left: scrollPosition,
        behavior: 'smooth',
      });
    }
  }

  // ==========================================
  // Manuelles Scrollen: Updated die Dots
  // ==========================================
  public onScroll(): void {
    const grid = this.scrollGrid.nativeElement;
    const scrollCenter = grid.scrollLeft + grid.clientWidth / 2;

    let closestIndex = 0;
    let minDistance = Infinity;

    // Wir schauen, welche Karte der Mitte aktuell am nächsten ist
    Array.from(grid.children).forEach((child: Element, index: number) => {
      const item = child as HTMLElement;
      const itemCenter = item.offsetLeft + item.clientWidth / 2;
      const distance = Math.abs(scrollCenter - itemCenter);

      if (distance < minDistance) {
        minDistance = distance;
        closestIndex = index;
      }
    });

    // DOT Update
    if (this.currentActiveIndex !== closestIndex) {
      this.currentActiveIndex = closestIndex;
    }
  }
}
