# Personal Developer Portfolio

**[Live Website ansehen](https://timo-boening.de)**

## Über das Projekt
Dieses Repository enthält den Quellcode meiner persönlichen Entwickler-Portfolio-Website. Die Seite dient als zentrale Anlaufstelle für meine abgeschlossenen Projekte und gibt einen Überblick über meinen Tech-Stack sowie meinen Werdegang.

Besonderer Wert wurde auf ein komplett eigenständiges UI/UX-Design gelegt. Abweichend vom regulären Curriculum habe ich das Design von Grund auf selbst konzipiert und in iterativen Feedbackschleifen in enger Abstimmung mit der Design-Abteilung der Developer Akademie verfeinert. Ziel war es, meine konzeptionelle Erfahrung als Mediengestalter nahtlos mit meinen neuen technischen Fähigkeiten in der Frontend-Entwicklung (Angular) zu vereinen.

## Tech-Stack
* **Framework:** Angular
* **Sprachen:** TypeScript, HTML5
* **Styling:** SCSS

## Kern-Features & Architektur
* **Modulare Angular-Architektur:** Strikte Aufteilung der UI in gekapselte, wiederverwendbare Komponenten (z. B. Project-Cards, Kontaktformular, Navigation).
* **Custom Styling (SCSS):** Bewusster Verzicht auf schwere CSS-Frameworks wie Bootstrap. Stattdessen wurde eine maßgeschneiderte, wartbare SCSS-Struktur mit globalen Variablen und Mixins implementiert, um das eigene Design-System pixelgenau umzusetzen.
* **Responsive Design:** Die gesamte Anwendung ist nahtlos responsiv entwickelt und bietet optimale Layout-Übergänge von Mobile bis Desktop.
* **Formular-Validierung & API-Anbindung:** Implementierung eines Kontaktformulars mit clientseitiger Validierung und asynchronem Nachrichten-Versand.

## Lokale Ausführung
Um das Projekt lokal auszuführen, klone das Repository und nutze die Angular CLI:

```bash
git clone [deine-repo-url]
cd [ordnername]
npm install
ng serve
```
Navigiere anschließend im Browser zu `http://localhost:4200/`.
