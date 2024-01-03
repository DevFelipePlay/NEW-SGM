export interface IReqPostPlayConfirmacaoSolicitacaoVendaChipLicenciamento {
  token: string | Blob;
  id: number;
  status_pagamento: number;
  codigo_rastreio: Record<number, string>;
}
