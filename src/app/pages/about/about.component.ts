import { Component, OnInit, ViewChild, ElementRef, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './about.component.html',
  styleUrl: './about.component.scss'
})
export class AboutComponent implements OnInit, OnDestroy {
  @ViewChild('carouselSlides') carouselSlidesRef!: ElementRef;

  currentSlide = 0;
  slides = [
    { id: 0, title: 'Le Projet' },
    { id: 1, title: 'Notre Philosophie' },
    { id: 2, title: 'L\'Équipe' }
  ];

  autoPlayInterval: any;
  isAnimating = false;

  constructor() {}

  ngOnInit(): void {
    this.startAutoPlay();
  }

  ngOnDestroy(): void {
    this.stopAutoPlay();
  }

  prevSlide(): void {
    if (this.isAnimating) return;

    this.isAnimating = true;

    // Calculer le nouvel index en s'assurant qu'il reste dans les limites
    const nextIndex = (this.currentSlide - 1 + this.slides.length) % this.slides.length;

    // Appliquer la transition
    this.applySlideTransition(this.currentSlide, nextIndex);

    // Mettre à jour l'index courant
    this.currentSlide = nextIndex;

    // Réinitialiser l'auto-play
    this.resetAutoPlay();
  }

  nextSlide(): void {
    if (this.isAnimating) return;

    this.isAnimating = true;

    // Calculer le nouvel index en s'assurant qu'il reste dans les limites
    const nextIndex = (this.currentSlide + 1) % this.slides.length;

    // Appliquer la transition
    this.applySlideTransition(this.currentSlide, nextIndex);

    // Mettre à jour l'index courant
    this.currentSlide = nextIndex;

    // Réinitialiser l'auto-play
    this.resetAutoPlay();
  }

  goToSlide(index: number): void {
    if (this.isAnimating || index === this.currentSlide) return;

    this.isAnimating = true;

    // Appliquer la transition
    this.applySlideTransition(this.currentSlide, index);

    // Mettre à jour l'index courant
    this.currentSlide = index;

    // Réinitialiser l'auto-play
    this.resetAutoPlay();
  }

  private applySlideTransition(currentIndex: number, nextIndex: number): void {
    const slidesElement = this.carouselSlidesRef?.nativeElement;
    if (!slidesElement) return;

    const slides = slidesElement.querySelectorAll('.carousel-slide');
    const currentSlide = slides[currentIndex];
    const nextSlide = slides[nextIndex];

    // Préparer le slide entrant à droite ou à gauche selon la direction
    const direction = nextIndex > currentIndex ? 1 : -1;
    // Pour le cas spécial: dernier vers premier ou premier vers dernier
    const isWrap = Math.abs(nextIndex - currentIndex) > 1;
    const finalDirection = isWrap ? -direction : direction;

    nextSlide.style.transform = `translateX(${finalDirection * 100}%)`;
    nextSlide.style.opacity = '1';
    nextSlide.style.zIndex = '1';

    // Laisser le temps au navigateur d'appliquer ces styles avant d'ajouter la transition
    setTimeout(() => {
      // Faire sortir le slide courant
      currentSlide.style.transform = `translateX(${-finalDirection * 100}%)`;
      currentSlide.style.opacity = '0';
      currentSlide.style.zIndex = '0';

      // Faire entrer le nouveau slide
      nextSlide.style.transform = 'translateX(0)';

      // Réinitialiser l'état d'animation après la transition
      setTimeout(() => {
        this.isAnimating = false;
      }, 500); // Correspond à la durée de transition dans le CSS
    }, 20);
  }

  private startAutoPlay(): void {
    this.autoPlayInterval = setInterval(() => {
      this.nextSlide();
    }, 6000); // Change de slide toutes les 6 secondes
  }

  private stopAutoPlay(): void {
    if (this.autoPlayInterval) {
      clearInterval(this.autoPlayInterval);
    }
  }

  private resetAutoPlay(): void {
    this.stopAutoPlay();
    this.startAutoPlay();
  }
}
