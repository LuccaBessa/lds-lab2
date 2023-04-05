import { useQuery } from '@tanstack/react-query';
import { ClienteService, ICliente } from '../services';
import { ClienteForm } from '../components';
import { useState } from 'react';

const modalId: string = 'clienteForm';

export const Clientes = () => {
  const [selectedCliente, setSelectedCliente] = useState<number | null>(null);

  const getListaClientes = async () => {
    try {
      return await ClienteService.listarClientes();
    } catch (error) {
      return [];
    }
  };

  const { data } = useQuery<ICliente[]>({
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
              <th>Nome</th>
              <th>CPF</th>
              <th>RG</th>
            </tr>
          </thead>
          <tbody>
            {data && data.length > 0 && data.map(
              (cliente: ICliente) => (
                <label htmlFor={modalId}>
                  <tr key={cliente.id} onClick={() => setSelectedCliente(cliente.id)}>
                    <td>{cliente.nome}</td>
                    <td>{cliente.cpf}</td>
                    <td>{cliente.rg}</td>
                  </tr>
                </label>
              ),
              []
            )}
          </tbody>
        </table>
        {(data?.length === 0 || data === undefined) && (
          <div className='flex justify-center items-center p-2'>
            <p className='text-gray-500'>Nenhum cliente cadastrado</p>
          </div>
        )}
      </div>
      <ClienteForm id={modalId} clienteId={selectedCliente} />
    </>
  );
};
