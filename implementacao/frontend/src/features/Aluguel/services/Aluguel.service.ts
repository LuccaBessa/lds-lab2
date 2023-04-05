import { http } from '../../../utils';
import { IAluguel, ICarro } from './interfaces';

export class AluguelService {
  static async listarAlugueis(): Promise<IAluguel[]> {
    const response = await http.get('/aluguel');
    return response.data;
  }

  static async listarAluguel(id: number): Promise<IAluguel> {
    const response = await http.get(`/aluguel/${id}`);
    return response.data;
  }

  static async criarAluguel(aluguel: IAluguel): Promise<void> {
    await http.post('/aluguel', aluguel);
  }

  static async atualizarAluguel(aluguel: IAluguel): Promise<void> {
    await http.put(`/aluguel/${aluguel.id}`, aluguel);
  }

  static async deletarAluguel(id: number): Promise<void> {
    await http.delete(`/aluguel/${id}`);
  }

  static async listarCarros(): Promise<ICarro[]> {
    const response = await http.get('/carro');
    return response.data;
  }
}