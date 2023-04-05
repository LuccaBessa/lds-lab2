import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { AluguelService } from '../services';
import { IAluguel } from '../services/interfaces';
import { AluguelForm } from '../components';

const modalId: string = 'aluguelForm';

export const Alugueis = () => {
  const [selectedAluguel, setSelectedAluguel] = useState<number | null>(null);

  const getListaClientes = async () => {
    try {
      return await AluguelService.listarAlugueis();
    } catch (error) {
      return [];
    }
  };

  const { data } = useQuery<IAluguel[]>({
    queryKey: ['clientes'],
    queryFn: getListaClientes,
  });

  return (
    <>
      <div className='flex justify-end items-center p-2'>
        <label htmlFor={modalId} className='btn'>
          Criar
        </label>
      </div>
      <div className='overflow-x-auto'>
        <table className='table w-full'>
          <thead>
            <tr>
              <th>Cliente</th>
              <th>Carro</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {data &&
              data.length > 0 &&
              data.map(
                (aluguel: IAluguel) => (
                  <label htmlFor={modalId}>
                    <tr key={aluguel.id} onClick={() => setSelectedAluguel(aluguel.id)}>
                      <td>{`${aluguel.carro!.marca} ${aluguel.carro!.modelo} (${aluguel.carro!.placa})`}</td>
                      <td>{aluguel.status}</td>
                    </tr>
                  </label>
                ),
                []
              )}
          </tbody>
        </table>
        {(data?.length === 0 || data === undefined) && (
          <div className='flex justify-center items-center p-2'>
            <p className='text-gray-500'>Nenhum aluguel cadastrado</p>
          </div>
        )}
      </div>
      <AluguelForm id={modalId} aluguelId={selectedAluguel} onClose={() => setSelectedAluguel(null)} />
    </>
  );
};
