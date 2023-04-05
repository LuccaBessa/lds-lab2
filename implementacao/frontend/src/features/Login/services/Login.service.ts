import { http } from '../../../utils';
import { IUsuario } from './interfaces';

export class LoginService {
  static async logar(email: string, senha: string): Promise<IUsuario> {
    return await http.post('/login', { email, senha });
  }
}