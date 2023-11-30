export interface IReqPostPlayEditaPremiacao {
  cpf: string;
  id: string;
  nome_premio: strig;
  descricao: string;
  foto: string;
  quantidade: string;
  tempo_expiracao?: string;
  valor_din: string;
  valor_premio: string;
  pontos_resgate: string;
  resgate?: boolean;
}
