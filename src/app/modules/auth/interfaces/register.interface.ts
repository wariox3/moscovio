import { Usuario } from './usuario.interface';

export interface Register {
  username: string;
  password: string;
  confirmarContrasena: string;
  empresa_nombre: string;
  empresa_numero_identificacion: string;
  terminoCondicion: boolean;
  proyecto: string;
}

export interface RegisterResponse {
  usuario: Usuario;
}
