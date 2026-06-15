import { Component } from '@angular/core';

interface Skill {
  name: string;
  iconUrl: string;
}

@Component({
  selector: 'app-skills',
  imports: [],
  templateUrl: './skills.html',
  styleUrl: './skills.scss',
})
export class Skills {
  public mySkills: Skill[] = [
    // --- ROW 1 (Design & CMS) ---
    { name: 'WordPress', iconUrl: 'assets/icons/skills/creative/wordpress-creative.svg' },
    { name: 'Webflow', iconUrl: 'assets/icons/skills/creative/webflow-creative.svg' },
    { name: 'Adobe CC', iconUrl: 'assets/icons/skills/creative/adobe-creative.svg' },
    { name: 'Figma', iconUrl: 'assets/icons/skills/creative/figma-creative.svg' },

    // --- ROW 2 (Frontend & Tools) ---
    { name: 'API', iconUrl: 'assets/icons/skills/frontend/api-frontend.svg' },
    { name: 'Git', iconUrl: 'assets/icons/skills/frontend/git-frontend.svg' },
    { name: 'CSS3', iconUrl: 'assets/icons/skills/frontend/css-frontend.svg' },
    { name: 'HTML5', iconUrl: 'assets/icons/skills/frontend/html-frontend.svg' },
    { name: 'Scrum', iconUrl: 'assets/icons/skills/frontend/scrum-frontend.svg' },
    { name: 'TypeScript', iconUrl: 'assets/icons/skills/frontend/typescript-frontend.svg' },
    { name: 'JavaScript', iconUrl: 'assets/icons/skills/frontend/javascript-frontend.svg' },
    { name: 'Angular', iconUrl: 'assets/icons/skills/frontend/angular-frontend.svg' },
    {
      name: 'Test Automation',
      iconUrl: 'assets/icons/skills/frontend/test-automation-frontend.svg',
    },
    { name: 'Supabase', iconUrl: 'assets/icons/skills/frontend/supabase-frontend.svg' },

    // --- ROW 3 (Backend) ---
    { name: 'Python', iconUrl: 'assets/icons/skills/backend/python-backend.svg' },
    { name: 'Django', iconUrl: 'assets/icons/skills/backend/django-backend.svg' },
    { name: 'Linux', iconUrl: 'assets/icons/skills/backend/linux-backend.svg' },
    { name: 'Redis', iconUrl: 'assets/icons/skills/backend/redis-backend.svg' },
    { name: 'PostgreSQL', iconUrl: 'assets/icons/skills/backend/postgresql-backend.svg' },
    { name: 'SQL', iconUrl: 'assets/icons/skills/backend/sql-backend.svg' },
    { name: 'Docker', iconUrl: 'assets/icons/skills/backend/docker-backend.svg' },
    { name: 'RxJS', iconUrl: 'assets/icons/skills/backend/rxjs-backend.svg' },
  ];
}
