import { FormikErrors, useFormik } from 'formik';
import * as Yup from 'yup';
import { useRef, useState } from 'react';
import { IAluguel } from '../services/interfaces';
import { AluguelService } from '../services';
import { useQuery } from '@tanstack/react-query';

interface IProps {
  id: string;
  aluguelId: number | null;
  onClose: () => void;
}

export const AluguelForm = ({ id, aluguelId, onClose }: IProps) => {
  const checkboxRef = useRef<HTMLInputElement>(null);

  const formik = useFormik<IAluguel>({
    initialValues: {
      id: 0,
      status: '',
      carro: undefined,
      cliente: undefined,
      contrato: undefined,
    },
    validationSchema: Yup.object({
      status: Yup.string().required('Status é obrigatório'),
      carro: Yup.object().required('Carro é obrigatório'),
      cliente: Yup.object().required('Cliente é obrigatório'),
      contrato: Yup.object().required('Contrato é obrigatório'),
    }),
    onSubmit: async (values) => {
      try {
        if (aluguelId) {
          await AluguelService.atualizarAluguel(values);
        } else {
          await AluguelService.criarAluguel(values);
        }
      } catch (error) {
        console.log(error);
      } finally {
        formik.resetForm();
        if (checkboxRef.current) checkboxRef.current.checked = false;
        onClose();
      }
    },
  });

  const excluirCliente = async () => {
    try {
      await AluguelService.deletarAluguel(aluguelId!);
      formik.resetForm();
      if (checkboxRef.current) checkboxRef.current.checked = false;
      onClose();
    } catch (error) {
      console.log(error);
    }
  };

  const getCarros = async () => {
    try {
      return await AluguelService.listarCarros();
    } catch (error) {
      return [];
    }
  };

  const { data } = useQuery({
    queryKey: ['carros'],
    queryFn: getCarros,
  });

  return (
    <>
      <input ref={checkboxRef} type='checkbox' id={id} className='modal-toggle' />
      <div className='modal'>
        <div className='modal-box max-h-[610px]'>
          <div className='flex justify-between items-center mb-6'>
            <h2 className='text-xl'>{aluguelId ? 'Editar' : 'Criar'} Aluguel</h2>
            <label htmlFor={id} className='modal-close btn btn-ghost' onClick={() => formik.resetForm()}>
              <span>X</span>
            </label>
          </div>
          <form onSubmit={formik.handleSubmit}>
            <div className='flex flex-col gap-4 overflow-y-auto max-h-[416px] p-2'>
              <div className='form-control w-full'>
                <select className='select select-bordered' value={formik.values.status} onChange={formik.handleChange}>
                  <option value='inativo'>Inativo</option>
                  <option value='ativo'>Ativo</option>
                </select>
              </div>
              <div className='form-control w-full'>
                <select className='select select-bordered' value={JSON.stringify(formik.values.carro)} onChange={(e) => formik.setFieldValue('carro', JSON.parse(e.currentTarget.value))}>
                  <option value=''>Selecione um carro</option>
                  {data?.map((carro) => (
                    <option key={carro.id} value={JSON.stringify(carro)}>
                      {`${carro.marca} ${carro.modelo} (${carro.placa})`}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div className='modal-action'>
              {aluguelId && (
                <button className='btn btn-error' onClick={() => excluirCliente()}>
                  Excluir
                </button>
              )}
              <label htmlFor={id}>
                <button type='submit' className='btn'>
                  Salvar
                </button>
              </label>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};
