export interface IRendimento {
  id: number
  nome: string
  valor: number
}

export interface ICliente {
  id: number
  nome: string
  email: string
  senha: string
  cpf: string
  rg: string
  profissao: string
  endereco: string
  rendimentos: IRendimento[]
}
