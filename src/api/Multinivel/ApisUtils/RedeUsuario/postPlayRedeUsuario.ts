import { IReqPostPlayRedeUsuario } from '.';
import { apiPlayMMN } from '../../../../services/apiPlayMMN';

export const postPlayRedeUsuario = async (req: IReqPostPlayRedeUsuario, index: number) =>
  (await apiPlayMMN.post('/mostraArvore', req)).data[index];
