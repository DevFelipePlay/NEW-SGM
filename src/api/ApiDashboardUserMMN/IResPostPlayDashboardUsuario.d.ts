export interface IResPostPlayDashboardUsuario {
  nome: string;
  indicado_por: string;
  status: string;
  saldo_dados: number;
  expira_em: string;
  graduacao: string | null;
  usuarios_ativos: number;
  total_niveis: string | null;
  bonus_receber: string | null;
  bonus_recebidos: string | null;
  id_indicacao: string;
  plano: string;
  licenciamento: boolean | null;
}
