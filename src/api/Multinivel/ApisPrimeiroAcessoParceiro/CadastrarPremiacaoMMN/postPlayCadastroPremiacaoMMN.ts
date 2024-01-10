import { apiPlayMMN } from '../../../../services/apiPlayMMN';

export const postPlayCadastroPremiacaoMMN = async (req: any) =>
  (await apiPlayMMN.post('/cadastraPremiacao', req)).data;
