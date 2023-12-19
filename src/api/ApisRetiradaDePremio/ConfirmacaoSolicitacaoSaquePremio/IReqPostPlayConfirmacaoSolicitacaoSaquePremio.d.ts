export interface IReqPostPLayConfirmacaoSolicitacaoSaquePremio {
  token: string | Blob;
  id: number;
  status_pagamento: 0 | 1;
  codigo_rastreio: string;
}
