export interface IReqPostPLayConfirmacaoSolicitacaoSaquePremio {
  token: string | Blob;
  id: number;
  status_pagamento: 0 | 1;
  coodigo_rastreio: string;
}
