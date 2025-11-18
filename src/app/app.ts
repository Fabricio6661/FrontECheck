import { Component, computed, inject, signal } from '@angular/core';
import{toSignal} from '@angular/core/rxjs-interop'
import { NavigationEnd, Router, RouterLink, RouterOutlet, RouterLinkActive } from '@angular/router';
import { filter, map, startWith } from 'rxjs';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  private router = inject(Router);
  //url reativa: atualiza a cada navegação

  urlSig = toSignal(
    //escuta os eventos do (navegações)
    this.router.events.pipe(
      filter(e => e instanceof NavigationEnd),

      startWith(null),

      map(()=> (this.router.url || '').split('?')[0].split('#')[0])

    ),

      {initialValue: (typeof location !== 'undefined' ? location.pathname: '/')}
  );

  isAuthPage = computed(()=> {
    const url = this.urlSig();

    return url?.startsWith('/login') || url?.startsWith('/recuperarsenha');
  })
  
}
