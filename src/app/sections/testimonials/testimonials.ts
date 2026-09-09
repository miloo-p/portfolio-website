import { Component } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';

interface Testimonial {
  name: string;
  text: string;
}

@Component({
  selector: 'app-testimonials',
  imports: [TranslatePipe],
  templateUrl: './testimonials.html',
  styleUrl: './testimonials.scss',
})
export class Testimonials {
  public myTestemonials: Testimonial[] = [
    {
      name: 'Jermaine Jérôme Bärwolf, Fullstack Developer',
      text: 'Timo was the structural backbone of our project. From day one, he set up a clean architecture and global styling, which made teamwork incredibly smooth. He works in a highly structured manner and tackles difficult technical challenges with ease.',
    },
    {
      name: 'Kevin Reinhold Triebe, Frontend Developer',
      text: 'Timo is an absolute must-have for any CSS-heavy project. He has a sharp logical mind and is always ready to step in whenever the team gets stuck. From the very beginning, he contributed brilliant ideas and executed them flawlessly. His technical expertise and proactive attitude are outstanding.',
    },
    {
      name: 'Magdalena Laurisch, Developer & Teammate',
      text: 'Timo ist ein sehr kompetenter und organisierter Kollege, der auch als Teamleader überzeugt. Besonders im Bereich CSS verfügt er über enormes Fachwissen und arbeitet sehr akribisch und aufmerksam. Timo ist ein super Kollege, der jedes Team bereichert.',
    },
  ];
}
