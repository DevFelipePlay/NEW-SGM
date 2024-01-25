import { IReqPostPlayCalculoPorcentagemSaque } from '.';
import { apiPlayMMN } from '../../../services/apiPlayMMN';

export const postPlayCalculoPorcentagemSaque = async (req: IReqPostPlayCalculoPorcentagemSaque) =>
  (await apiPlayMMN.post('/CalculoPorcentagemSaque', req)).data;
