import { IReqPostPlayCadastroDadosFinanceiros } from '.';
import { apiPlayMMN } from '../../../../services/apiPlayMMN';

export const postPlayCadastroDadosFinanceiros = async (req: IReqPostPlayCadastroDadosFinanceiros) =>
  (await apiPlayMMN.post('/dadosfinanceiros', req)).data;
