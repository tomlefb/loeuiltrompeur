import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './about.component.html',
  styleUrl: './about.component.scss'
})
export class AboutComponent implements OnInit, OnDestroy {
  private observer: IntersectionObserver | null = null;

  constructor() {}

  ngOnInit(): void {
    // Configuration de l'Intersection Observer pour les animations au défilement
    this.observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            // Ajouter la classe animate quand l'élément devient visible
            (entry.target as HTMLElement).classList.add('animate');
            // Arrêter d'observer une fois l'animation déclenchée
            this.observer?.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -100px 0px' }
    );

    // Observer tous les éléments pertinents
    setTimeout(() => {
      const elements = document.querySelectorAll('.about-card, .about-quote');
      elements.forEach(element => {
        this.observer?.observe(element);
      });
    }, 100);
  }

  ngOnDestroy(): void {
    // Nettoyer l'observer quand le composant est détruit
    if (this.observer) {
      this.observer.disconnect();
      this.observer = null;
    }
  }
}
