export interface IReqPostPlayEditarPlano {
  cpf?: string;
  token?: string | Blob;
  plano_id: string;
  acao: string;
  nivel: number;
}
