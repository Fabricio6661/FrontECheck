import { TipoUsuario } from "../components/enums/tipo-usuario.enum";

export interface UsuarioModel {
  id: string,
  nome: string,
  email: string,
  senha: string,
  tipo: TipoUsuario
}