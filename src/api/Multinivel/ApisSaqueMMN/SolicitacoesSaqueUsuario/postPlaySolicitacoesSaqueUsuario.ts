import { IReqPostPlaySolicitacoesSaqueUsuario } from '.';
import { apiPlayMMN } from '../../../../services/apiPlayMMN';

export const postPlaySolicitacaoSaqueUsuario = async (req: IReqPostPlaySolicitacoesSaqueUsuario) =>
  (await apiPlayMMN.post('/SolicitacoesSaquesUsuario', req)).data;
