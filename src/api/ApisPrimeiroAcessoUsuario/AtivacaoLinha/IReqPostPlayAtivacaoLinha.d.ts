export interface IReqPostPlayAtivacaoLinha {
  token: string | Blob;
  cpf: string;
  iccid: string;
  ddd: string;
  planid?: string;
  planid_personalizado?: string;
  pospago: boolean;
}
