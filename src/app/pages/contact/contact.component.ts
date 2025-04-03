import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.scss'
})
export class ContactComponent {
  // Ajoutez ici toute logique nécessaire pour le formulaire de contact
  submitForm() {
    // Implémentez la logique d'envoi du formulaire
    console.log('Form submitted');
  }
}
