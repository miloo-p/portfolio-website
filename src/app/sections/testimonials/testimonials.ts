import { Component } from '@angular/core';

interface Testimonial {
  name: string;
  text: string;
}

@Component({
  selector: 'app-testimonials',
  imports: [],
  templateUrl: './testimonials.html',
  styleUrl: './testimonials.scss',
})
export class Testimonials {
  public myTestemonials: Testimonial[] = [
    {
      name: 'Jemand Wichtiges, Developer',
      text: 'Dies ist ein absolut offensichtlicher Platzhalter-Text. Stell dir einfach vor, hier würde jetzt eine echte Person sehr enthusiastisch über meine Problemlösungs-Skills, meine Zuverlässigkeit und meinen Background als Mediengestalter berichten. Klingt gut, oder? Das echte Zitat folgt in Kürze.',
    },
    {
      name: 'Jemand Wichtiges, Developer',
      text: 'Dies ist ein absolut offensichtlicher Platzhalter-Text. Stell dir einfach vor, hier würde jetzt eine echte Person sehr enthusiastisch über meine Problemlösungs-Skills, meine Zuverlässigkeit und meinen Background als Mediengestalter berichten. Klingt gut, oder? Das echte Zitat folgt in Kürze.',
    },
    {
      name: 'Jemand Wichtiges, Developer',
      text: 'Dies ist ein absolut offensichtlicher Platzhalter-Text. Stell dir einfach vor, hier würde jetzt eine echte Person sehr enthusiastisch über meine Problemlösungs-Skills, meine Zuverlässigkeit und meinen Background als Mediengestalter berichten. Klingt gut, oder? Das echte Zitat folgt in Kürze.',
    },
  ];
}
