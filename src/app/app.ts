import { Component, signal } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterLink],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('frontECheck');

    constructor(public router: Router) {}

  
  mostrarNavbar(): boolean {
    return this.router.url !== '/login';
  }
  
}
