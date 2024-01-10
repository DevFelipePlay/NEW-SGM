import { IReqPostPlayEditarNiveisAtivacao } from '.';
import { apiPlayMMN } from '../../../../services/apiPlayMMN';

export const postPlayEditarNiveisAtivacao = async (req: IReqPostPlayEditarNiveisAtivacao) =>
  (await apiPlayMMN.post('/EditarNiveisAtivacao', req)).data;
