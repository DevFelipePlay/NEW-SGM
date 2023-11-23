import { apiPlayMMN } from '../../../services/apiPlayMMN';
import { IReqPostPlayCadastroDadosFinanceiros } from './IReqPostPlayCadastroDadosFinanceiros';

export const postPlayCadastroDadosFinanceiros = async (req: IReqPostPlayCadastroDadosFinanceiros) =>
  (await apiPlayMMN.post('/dadosfinanceiros', req)).data;
