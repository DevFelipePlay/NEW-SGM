export interface IResPostPlaySolicitacoesSaqueUsuario {
  ID: number;
  Tipo: string;
  valor_solicitado: string;
  saldo_disponivel: string;
  status_pagamento: 1 | 0;
  data_solicitacao: string;
  mensagem_negado: string | null;
}
