import { IReqPostPlayCadastroPontosPorModalidade } from '.';
import { apiPlayMMN } from '../../../../services/apiPlayMMN';

export const postPlayCadastroPontosPorModalidade = async (
  req: IReqPostPlayCadastroPontosPorModalidade
) => (await apiPlayMMN.post('/pontospornivel', req)).data;
