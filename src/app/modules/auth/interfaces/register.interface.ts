import { Usuario } from './usuario.interface';

export interface Register {
  username: string;
  password: string;
  confirmarContrasena: string;
  terminoCondicion: boolean;
  proyecto: string;
}

export interface RegisterResponse {
  usuario: Usuario;
}
