import { FormikErrors, useFormik } from 'formik';
import { ClienteService, ICliente, IRendimento } from '../services';
import * as Yup from 'yup';
import { useRef, useState } from 'react';

interface IProps {
  id: string;
  clienteId: number | null;
  onClose: () => void;
}

export const ClienteForm = ({ id, clienteId, onClose }: IProps) => {
  const [currentRendimento, setCurrentRendimento] = useState<IRendimento>({ id: -1, nome: '', valor: 0 });
  const checkboxRef = useRef<HTMLInputElement>(null);

  const formik = useFormik<ICliente>({
    initialValues: {
      nome: '',
      cpf: '',
      rg: '',
      id: 0,
      email: '',
      senha: '',
      profissao: '',
      endereco: '',
      rendimentos: [],
    },
    validationSchema: Yup.object({
      nome: Yup.string().required('Obrigatório'),
      email: Yup.string().email('Email inválido').required('Obrigatório'),
      senha: Yup.string().required('Obrigatório'),
      cpf: Yup.string().required('Obrigatório'),
      rg: Yup.string().required('Obrigatório'),
      profissao: Yup.string().required('Obrigatório'),
      endereco: Yup.string().required('Obrigatório'),
      rendimentos: Yup.array()
        .of(
          Yup.object().shape({
            nome: Yup.string().required('Obrigatório'),
            valor: Yup.number().required('Obrigatório').positive('O valor deve ser positivo'),
          })
        )
        .max(3),
    }),
    onSubmit: async (values) => {
      try {
        if (clienteId) {
          await ClienteService.atualizarCliente(values);
        } else {
          await ClienteService.criarCliente(values);
        }
      } catch (error) {
        console.log(error);
      } finally {
        formik.resetForm();
        setCurrentRendimento({ id: -1, nome: '', valor: 0 });
        if (checkboxRef.current) checkboxRef.current.checked = false;
        onClose();
      }
    },
  });

  const excluirCliente = async () => {
    try {
      await ClienteService.deletarCliente(clienteId!);
      formik.resetForm();
      setCurrentRendimento({ id: -1, nome: '', valor: 0 });
      if (checkboxRef.current) checkboxRef.current.checked = false;
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <input ref={checkboxRef} type='checkbox' id={id} className='modal-toggle' />
      <div className='modal'>
        <div className='modal-box '>
          <div className='flex justify-between items-center mb-6'>
            <h2 className='text-xl'>{clienteId ? 'Editar' : 'Criar'} Cliente</h2>
            <label htmlFor={id} className='modal-close btn btn-ghost' onClick={() => formik.resetForm()}>
              <span>X</span>
            </label>
          </div>
          <form onSubmit={formik.handleSubmit}>
            <div className='flex flex-col gap-4 overflow-y-auto p-2 max-h-[610px]'>
              <div className='form-control w-full'>
                <input type='text' placeholder='Nome' id='nome' name='nome' className={`input input-bordered w-full ${formik.errors.nome && formik.touched.nome && 'input-error'}`} value={formik.values.nome} onChange={formik.handleChange} />
                {formik.errors.nome && formik.touched.nome && (
                  <label className='label'>
                    <span className='label-text-alt text-error'>{formik.errors.nome}</span>
                  </label>
                )}
              </div>
              <div className='form-control w-full'>
                <input type='text' placeholder='Email' id='email' name='email' className={`input input-bordered w-full ${formik.errors.email && formik.touched.email && 'input-error'}`} value={formik.values.email} onChange={formik.handleChange} />
                {formik.errors.email && formik.touched.email && (
                  <label className='label'>
                    <span className='label-text-alt text-error'>{formik.errors.email}</span>
                  </label>
                )}
              </div>
              <div className='form-control w-full'>
                <input type='password' placeholder='Senha' id='senha' name='senha' className={`input input-bordered w-full ${formik.errors.senha && formik.touched.senha && 'input-error'}`} value={formik.values.senha} onChange={formik.handleChange} />
                {formik.errors.senha && formik.touched.senha && (
                  <label className='label'>
                    <span className='label-text-alt text-error'>{formik.errors.senha}</span>
                  </label>
                )}
              </div>
              <div className='form-control w-full'>
                <input type='text' placeholder='CPF' id='cpf' name='cpf' className={`input input-bordered w-full ${formik.errors.cpf && formik.touched.cpf && 'input-error'}`} value={formik.values.cpf} onChange={formik.handleChange} />
                {formik.errors.cpf && formik.touched.cpf && (
                  <label className='label'>
                    <span className='label-text-alt text-error'>{formik.errors.cpf}</span>
                  </label>
                )}
              </div>
              <div className='form-control w-full'>
                <input type='text' placeholder='RG' id='rg' name='rg' className={`input input-bordered w-full ${formik.errors.rg && formik.touched.rg && 'input-error'}`} value={formik.values.rg} onChange={formik.handleChange} />
                {formik.errors.rg && formik.touched.rg && (
                  <label className='label'>
                    <span className='label-text-alt text-error'>{formik.errors.rg}</span>
                  </label>
                )}
              </div>
              <div className='form-control w-full'>
                <input type='text' placeholder='Profissão' id='profissao' name='profissao' className={`input input-bordered w-full ${formik.errors.profissao && formik.touched.profissao && 'input-error'}`} value={formik.values.profissao} onChange={formik.handleChange} />
                {formik.errors.profissao && formik.touched.profissao && (
                  <label className='label'>
                    <span className='label-text-alt text-error'>{formik.errors.profissao}</span>
                  </label>
                )}
              </div>
              <div className='form-control w-full'>
                <input type='text' placeholder='Endereço' id='endereco' name='endereco' className={`input input-bordered w-full ${formik.errors.endereco && formik.touched.endereco && 'input-error'}`} value={formik.values.endereco} onChange={formik.handleChange} />
                {formik.errors.endereco && formik.touched.endereco && (
                  <label className='label'>
                    <span className='label-text-alt text-error'>{formik.errors.endereco}</span>
                  </label>
                )}
              </div>
              <p className='text-lg'>Rendimentos</p>
              <div className='flex flex-col gap-2'>
                <div className='flex gap-2'>
                  <div className='form-control w-full'>
                    <input
                      type='text'
                      placeholder='Nome'
                      className='input input-bordered w-full'
                      value={currentRendimento.nome}
                      onChange={(e) => {
                        setCurrentRendimento((prev) => ({ ...prev, nome: e.target.value }));
                      }}
                    />
                  </div>
                  <div className='form-control w-full relative'>
                    <span className='absolute top-[12px] left-3'>R$</span>
                    <input
                      type='number'
                      placeholder='Valor'
                      className='input input-bordered w-full pl-10'
                      value={currentRendimento.valor}
                      onChange={(e) => {
                        setCurrentRendimento((prev) => ({ ...prev, valor: Number(e.target.value) }));
                      }}
                    />
                  </div>
                </div>
                <button
                  type='button'
                  className='btn'
                  disabled={currentRendimento.nome === '' || currentRendimento.valor === 0 || formik.values.rendimentos.length >= 3}
                  onClick={() => {
                    formik.values.rendimentos.length < 3 && formik.setFieldValue('rendimentos', [...formik.values.rendimentos, currentRendimento]);
                    setCurrentRendimento({ id: -1, nome: '', valor: 0 });
                  }}
                >
                  Adicionar
                </button>
              </div>
              <div className='min-h-[128px]'>
                <table className='table w-full'>
                  <thead>
                    <tr>
                      <th>Nome</th>
                      <th>Valor</th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    {formik.values.rendimentos &&
                      formik.values.rendimentos.length > 0 &&
                      formik.values.rendimentos.map(
                        (rendimento: IRendimento) => (
                          <tr key={rendimento.id}>
                            <td>{rendimento.nome}</td>
                            <td>{rendimento.valor}</td>
                            <td>
                              <button
                                className='btn btn-ghost'
                                onClick={() =>
                                  formik.setFieldValue(
                                    'rendimentos',
                                    formik.values.rendimentos.filter((r) => JSON.stringify(r) == JSON.stringify(rendimento))
                                  )
                                }
                              >
                                <svg xmlns='http://www.w3.org/2000/svg' className='h-[15px]' fill='white' viewBox='0 0 448 512'>
                                  <path d='M135.2 17.7L128 32H32C14.3 32 0 46.3 0 64S14.3 96 32 96H416c17.7 0 32-14.3 32-32s-14.3-32-32-32H320l-7.2-14.3C307.4 6.8 296.3 0 284.2 0H163.8c-12.1 0-23.2 6.8-28.6 17.7zM416 128H32L53.2 467c1.6 25.3 22.6 45 47.9 45H346.9c25.3 0 46.3-19.7 47.9-45L416 128z' />
                                </svg>
                              </button>
                            </td>
                          </tr>
                        ),
                        []
                      )}
                  </tbody>
                </table>
                {(formik.values.rendimentos?.length === 0 || formik.values.rendimentos === undefined) && (
                  <div className='flex justify-center items-center p-2'>
                    <p className='text-gray-500'>Nenhum rendimento cadastrado</p>
                  </div>
                )}
              </div>
            </div>
            <div className='modal-action'>
              {clienteId && (
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
