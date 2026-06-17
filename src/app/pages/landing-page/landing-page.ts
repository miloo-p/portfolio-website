import { Component } from '@angular/core';
import { Hero } from '../../sections/hero/hero';
import { About } from '../../sections/about/about';
import { Skills } from '../../sections/skills/skills';
import { Projects } from '../../sections/projects/projects';
import { Testimonials } from '../../sections/testimonials/testimonials';
import { Contact } from '../../sections/contact/contact';

@Component({
  selector: 'app-landing-page',
  imports: [Hero, About, Skills, Projects, Testimonials, Contact],
  templateUrl: './landing-page.html',
  styleUrl: './landing-page.scss',
})
export class LandingPage {}
