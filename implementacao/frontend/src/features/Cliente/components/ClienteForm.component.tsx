import { useFormik } from 'formik';
import { ClienteService, ICliente } from '../services';
import * as Yup from 'yup';
import { useRef, useState } from 'react';

interface IProps {
  id: string;
  clienteId: number | null;
}

export const ClienteForm = ({ id, clienteId }: IProps) => {
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
      endereco: {
        id: 0,
        cep: '',
        numero: '',
        rua: '',
        complemento: '',
        bairro: '',
        cidade: '',
        estado: '',
      },
      rendimentos: [],
    },
    validationSchema: Yup.object({
      nome: Yup.string().required('Obrigatório'),
      email: Yup.string().email('Email inválido').required('Obrigatório'),
      senha: Yup.string().required('Obrigatório'),
      cpf: Yup.string().required('Obrigatório'),
      rg: Yup.string().required('Obrigatório'),
      profissao: Yup.string().required('Obrigatório'),
      endereco: Yup.object({
        cep: Yup.string().required('Obrigatório'),
        numero: Yup.string().required('Obrigatório'),
        rua: Yup.string().required('Obrigatório'),
        complemento: Yup.string().required('Obrigatório'),
        bairro: Yup.string().required('Obrigatório'),
        cidade: Yup.string().required('Obrigatório'),
        estado: Yup.string().required('Obrigatório'),
      }),
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
      }
    },
  });

  const excluirCliente = async () => {
    try {
      await ClienteService.deletarCliente(clienteId!);
      formik.resetForm();
      if (checkboxRef.current) checkboxRef.current.checked = false;
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <input ref={checkboxRef} type='checkbox' id={id} className='modal-toggle' />
      <div className='modal'>
        <div className='modal-box max-h-[610px]'>
          <div className='flex justify-between items-center mb-6'>
            <h2 className='text-xl'>{clienteId ? 'Editar' : 'Criar'} Cliente</h2>
            <label htmlFor={id} className='modal-close btn btn-ghost' onClick={() => formik.resetForm()}>
              <i>X</i>
            </label>
          </div>
          <form onSubmit={formik.handleSubmit}>
            <div className='flex flex-col gap-4 overflow-y-auto max-h-[416px]'>
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
              <p className='text-lg'>Endereço</p>
              <div className='form-control w-full'>
                <input type='text' placeholder='CEP' id='endereco.cep' name='endereco.cep' className={`input input-bordered w-full ${formik.errors.endereco?.cep && formik.touched.endereco?.cep && 'input-error'}`} value={formik.values.endereco.cep} onChange={formik.handleChange} />
                {formik.errors.endereco?.cep && formik.touched.endereco?.cep && (
                  <label className='label'>
                    <span className='label-text-alt text-error'>{formik.errors.endereco?.cep}</span>
                  </label>
                )}
              </div>
              <div className='form-control w-full'>
                <input type='text' placeholder='Rua' id='endereco.rua' name='endereco.rua' className={`input input-bordered w-full ${formik.errors.endereco?.rua && formik.touched.endereco?.rua && 'input-error'}`} value={formik.values.endereco.rua} onChange={formik.handleChange} />
                {formik.errors.endereco?.rua && formik.touched.endereco?.rua && (
                  <label className='label'>
                    <span className='label-text-alt text-error'>{formik.errors.endereco?.rua}</span>
                  </label>
                )}
              </div>
              <div className='form-control w-full'>
                <input type='text' placeholder='Número' id='endereco.numero' name='endereco.numero' className={`input input-bordered w-full ${formik.errors.endereco?.numero && formik.touched.endereco?.numero && 'input-error'}`} value={formik.values.endereco.numero} onChange={formik.handleChange} />
                {formik.errors.endereco?.numero && formik.touched.endereco?.numero && (
                  <label className='label'>
                    <span className='label-text-alt text-error'>{formik.errors.endereco?.numero}</span>
                  </label>
                )}
              </div>
              <div className='form-control w-full'>
                <input type='text' placeholder='Complemento' id='endereco.complemento' name='endereco.complemento' className={`input input-bordered w-full ${formik.errors.endereco?.complemento && formik.touched.endereco?.complemento && 'input-error'}`} value={formik.values.endereco.complemento} onChange={formik.handleChange} />
                {formik.errors.endereco?.complemento && formik.touched.endereco?.complemento && (
                  <label className='label'>
                    <span className='label-text-alt text-error'>{formik.errors.endereco?.complemento}</span>
                  </label>
                )}
              </div>
              <div className='form-control w-full'>
                <input type='text' placeholder='Bairro' id='endereco.bairro' name='endereco.bairro' className={`input input-bordered w-full ${formik.errors.endereco?.bairro && formik.touched.endereco?.bairro && 'input-error'}`} value={formik.values.endereco.bairro} onChange={formik.handleChange} />
                {formik.errors.endereco?.bairro && formik.touched.endereco?.bairro && (
                  <label className='label'>
                    <span className='label-text-alt text-error'>{formik.errors.endereco?.bairro}</span>
                  </label>
                )}
              </div>
              <div className='form-control w-full'>
                <input type='text' placeholder='Cidade' id='endereco.cidade' name='endereco.cidade' className={`input input-bordered w-full ${formik.errors.endereco?.cidade && formik.touched.endereco?.cidade && 'input-error'}`} value={formik.values.endereco.cidade} onChange={formik.handleChange} />
                {formik.errors.endereco?.cidade && formik.touched.endereco?.cidade && (
                  <label className='label'>
                    <span className='label-text-alt text-error'>{formik.errors.endereco?.cidade}</span>
                  </label>
                )}
              </div>
              <div className='form-control w-full'>
                <input type='text' placeholder='Estado' id='endereco.estado' name='endereco.estado' className={`input input-bordered w-full ${formik.errors.endereco?.estado && formik.touched.endereco?.estado && 'input-error'}`} value={formik.values.endereco.estado} onChange={formik.handleChange} />
                {formik.errors.endereco?.estado && formik.touched.endereco?.estado && (
                  <label className='label'>
                    <span className='label-text-alt text-error'>{formik.errors.endereco?.estado}</span>
                  </label>
                )}
              </div>
            </div>
            <div className='modal-action'>
              {!clienteId && (
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
