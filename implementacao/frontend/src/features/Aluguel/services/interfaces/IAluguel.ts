import { ICliente } from '../../../Cliente'

export interface ICarro {
  id: number
  ano: string
  modelo: string
  marca: string
  placa: string
}

interface IContrato {
  id: number
}

export interface IAluguel {
  id: number
  status: string
  carro?: ICarro
  cliente?: ICliente
  contrato?: IContrato
}
