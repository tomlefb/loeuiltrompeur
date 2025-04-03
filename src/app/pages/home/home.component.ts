import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  imports:[],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  constructor(private router: Router) {}

  redirectToReservation() {
    this.router.navigate(['/reservation']);
  }

  redirectToMenu() {
    this.router.navigate(['/menu']);
  }
}
