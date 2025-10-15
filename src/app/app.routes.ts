import { Routes } from '@angular/router';
import { LoginComponent } from './components/login-component/login-component';
import { UsuarioComponent } from './components/usuario-component/usuario-component';
import { HomeComponent } from './components/home-component/home-component';

export const routes: Routes = [
    {path: 'login', component: LoginComponent},
    {path: 'usuario', component: UsuarioComponent},
    {path: 'home', component: HomeComponent}
];
