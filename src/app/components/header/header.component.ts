import { Component, OnInit, HostListener } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    RouterLinkActive
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnInit {
  menuOpen = false;
  hasScrolled = false;

  constructor() {}

  ngOnInit() {
    // Vérifier le défilement initial
    this.checkScroll();
  }

  @HostListener('window:scroll', [])
  checkScroll() {
    // Détecte si l'utilisateur a fait défiler la page
    this.hasScrolled = window.scrollY > 30;
  }

  toggleMenu() {
    this.menuOpen = !this.menuOpen;

    // Empêcher le défilement du body quand le menu est ouvert
    if (this.menuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  }

  closeMenu() {
    if (this.menuOpen) {
      this.menuOpen = false;
      document.body.style.overflow = '';
    }
  }
}
