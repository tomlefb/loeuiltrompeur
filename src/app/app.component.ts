import { Component } from '@angular/core';
import {HeaderComponent} from './components/header/header.component';
import {RouterOutlet} from '@angular/router';
import {FooterComponent} from './components/footer/footer.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  imports: [
    HeaderComponent,
    RouterOutlet,
    FooterComponent
  ],
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'l\'oeuil trompeur';
}
