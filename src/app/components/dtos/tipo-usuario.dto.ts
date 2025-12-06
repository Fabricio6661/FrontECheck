import { TipoUsuario } from "../enums/tipo-usuario.enum";

export interface UsuarioUpdateDto {
    id: string,
    nome: string;
    email: string;
    senha: string;
    tipo: TipoUsuario;
}