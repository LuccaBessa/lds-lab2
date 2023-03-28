import { http } from '../../../utils';
import { ICliente } from './interfaces';

export class ClienteService {
  static async listarClientes(): Promise<ICliente[]> {
    const response = await http.get('/clientes');
    return response.data;
  }

  static async listarCliente(id: number): Promise<ICliente> {
    const response = await http.get(`/clientes/${id}`);
    return response.data;
  }

  static async criarCliente(cliente: ICliente): Promise<void> {
    await http.post('/clientes', cliente);
  }

  static async atualizarCliente(cliente: ICliente): Promise<void> {
    await http.put(`/clientes/${cliente.id}`, cliente);
  }

  static async deletarCliente(id: number): Promise<void> {
    await http.delete(`/clientes/${id}`);
  }
}