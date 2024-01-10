export interface IResPostPlayListaSolicitacaoSaqueConcluido {
  ID: number;
  Nome: string;
  Valor_Pago: string;
  Saldo_Disponivel: string;
  Total_Sacado: string;
  status_pagamento: boolean;
  Data_Pagamento: string;
  mensagem_negado: string | null;
}
