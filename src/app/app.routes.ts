import { Routes } from '@angular/router';
import { LoginComponent } from './components/login-component/login-component';
import { UsuarioComponent } from './components/usuario-component/usuario-component';
import { HomeComponent } from './components/home-component/home-component';
import { QuestionarioComponent } from './components/questionario-component/questionario-component';

export const routes: Routes = [
    { path: '', redirectTo: '/login', pathMatch: 'full' },
    {path: 'login', component: LoginComponent},
    {path: 'usuarios', component: UsuarioComponent},
    {path: 'home', component: HomeComponent},
    {path: 'questionario', component: QuestionarioComponent}
];
