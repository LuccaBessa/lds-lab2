import { useFormik } from 'formik';
import * as Yup from 'yup';
import React, { useState } from 'react';
import { LoginService } from '../services';

export const Login = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [showToast, setShowToast] = useState(false);

  const formik = useFormik({
    initialValues: {
      email: '',
      senha: '',
    },
    validationSchema: Yup.object({
      email: Yup.string().email('Endereço de email inválido').required('Obrigatório'),
      senha: Yup.string().required('Obrigatório'),
    }),
    onSubmit: async (values) => {
      setIsLoading(true);

      try {
        const response = await LoginService.logar(values.email, values.senha);
        console.log(response);
      } catch (error) {
        setShowToast(true);
        setTimeout(() => {
          setShowToast(false);
        }, 3000);
      } finally {
        setIsLoading(false);
      }
    },
  });
  return (
    <div className='w-full h-full flex justify-center'>
      <form onSubmit={formik.handleSubmit} className='w-[400px] flex flex-col items-center justify-center gap-4'>
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
          <button type='submit' className={`btn w-full ${isLoading && 'loading'}`} disabled={isLoading}>
            {!isLoading && 'Entrar'}
          </button>
        </div>
      </form>
      {showToast && (
        <div className='toast toast-center'>
          <div className='alert alert-error'>
            <div className='w-[250px]'>
              <span className='text-white font-bold'>Credenciais inválidas</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
