import { IReqPostPlaySolicitacoesPremiosUsuario } from '.';
import { apiPlayMMN } from '../../../../services/apiPlayMMN';

export const postPlaySolicitacaoPremiosUsuario = async (
  req: IReqPostPlaySolicitacoesPremiosUsuario
) => (await apiPlayMMN.post('/SolicitacoesSaquesPremiosUsuario', req)).data;
