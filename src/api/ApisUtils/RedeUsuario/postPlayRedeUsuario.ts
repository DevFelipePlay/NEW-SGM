import { apiPlayMMN } from '../../../services/apiPlayMMN';
import { IReqPostPlayRedeUsuario } from './IReqPostPlayRedeUsuario';

export const postPlayRedeUsuario = async (req: IReqPostPlayRedeUsuario, index: number) =>
  (await apiPlayMMN.post('/mostraArvore', req)).data[index];
