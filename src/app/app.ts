import { Component, computed, signal } from '@angular/core';
import { NavigationEnd, Router, RouterLink, RouterOutlet, RouterLinkActive } from '@angular/router';
import { filter } from 'rxjs';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('frontECheck');

  // // 🔥 Criamos um signal que guarda a rota atual
  // currentRoute = signal<string>('');

  // constructor(private router: Router) {
  //   // Atualiza o signal sempre que a navegação termina
  //   this.router.events
  //     .pipe(filter(event => event instanceof NavigationEnd))
  //     .subscribe((event: NavigationEnd) => {
  //       this.currentRoute.set(event.urlAfterRedirects);
  //     });
  // }

  // // 🔥 Computed signal: retorna true se não for login
  // mostrarNavbar = computed(() => this.currentRoute() !== '/login');
  
}
