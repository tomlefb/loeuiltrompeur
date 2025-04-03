import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from './components/header/header.component';
import { RouterOutlet, Router, NavigationEnd } from '@angular/router';
import { FooterComponent } from './components/footer/footer.component';
import { filter } from 'rxjs/operators';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: true,
  imports: [
    CommonModule,  // Nécessaire pour *ngIf
    HeaderComponent,
    RouterOutlet,
    FooterComponent
  ],
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  title = 'l\'oeuil trompeur';
  isHomePage = false;

  constructor(private router: Router) {}

  ngOnInit() {
    // Observer les changements de route
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe((event: any) => {
      // Vérifier si l'URL est celle de la page d'accueil
      this.isHomePage = event.url === '/' || event.url === '';
    });

    // Vérifier aussi l'URL initiale
    this.isHomePage = this.router.url === '/' || this.router.url === '';
  }
}
