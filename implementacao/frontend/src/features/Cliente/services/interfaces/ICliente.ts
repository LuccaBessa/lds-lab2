interface IEndereco {
  id: number
  rua: string
  numero: string
  complemento: string
  bairro: string
  cidade: string
  estado: string
  cep: string
}

interface IRendimento {
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
  endereco: IEndereco
  rendimentos: IRendimento[]
}