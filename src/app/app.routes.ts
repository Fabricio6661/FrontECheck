import { Routes } from '@angular/router';
import { LoginComponent } from './components/login-component/login-component';
import { UsuarioComponent } from './components/usuario-component/usuario-component';
import { HomeComponent } from './components/home-component/home-component';
import { QuestionarioComponent } from './components/questionario-component/questionario-component';
import { UnidadeComponent } from './components/unidade-component/unidade-component';
import { ListaUsuarioComponent } from './components/usuario-list-component/lista-usuario-component';
import { RecuperarSenhaComponent } from './components/recuperar-senha-component/recuperar-senha-component';
import { ResponderFormularioComponent } from './components/responder-form-component/responder-form-component';


export const routes: Routes = [
    {path: '', redirectTo: 'login', pathMatch: 'full'},
    {path: 'login', component: LoginComponent},
    {path: 'usuarios', component: UsuarioComponent},
    {path: 'home', component: HomeComponent},
    {path: 'questionario', component: QuestionarioComponent},
    {path: 'unidade', component: UnidadeComponent},
    {path: 'listarUsuarios', component: ListaUsuarioComponent},
    {path: 'recuperarsenha', component: RecuperarSenhaComponent},
    {path: 'responderform/:id', component: ResponderFormularioComponent}

];
