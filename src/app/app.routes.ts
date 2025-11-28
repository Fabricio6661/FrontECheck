import { Routes } from '@angular/router';
import { LoginComponent } from './components/login-component/login-component';
import { UsuarioComponent } from './components/usuario-component/usuario-component';
import { HomeComponent } from './components/home-component/home-component';
import { QuestionarioComponent } from './components/questionario-component/questionario-component';
import { UnidadeComponent } from './components/unidade-component/unidade-component';
import { ListaUsuarioComponent } from './components/usuario-list-component/lista-usuario-component';
import { UnidadeListComponent } from './components/unidade-list-component/unidade-list-component';
import { QuestionarioListComponent } from './components/questionario-list-component/questionario-list-component';

export const routes: Routes = [
    //{ path: '', redirectTo: '/home', pathMatch: 'full' },
    {path: 'login', component: LoginComponent},
    {path: 'usuarios', component: UsuarioComponent},
    {path: 'home', component: HomeComponent},
    {path: 'questionario', component: QuestionarioComponent},
    {path: 'unidade', component: UnidadeComponent},
    {path: 'listarUsuario', component: ListaUsuarioComponent},
    {path: 'listarUnidade', component: UnidadeListComponent},
    {path: 'listarQuestionario', component: QuestionarioListComponent}
];
