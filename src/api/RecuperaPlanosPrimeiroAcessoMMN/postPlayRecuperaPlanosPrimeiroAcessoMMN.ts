import { IReqPostPlayRecuperaPlanosPrimeiroAcesso } from '.';
import { apiPlayMMN } from '../../services/apiPlayMMN';

export const postPlayRecuperaPlanosPrimeiroAcesso = async (
  reqArray: IReqPostPlayRecuperaPlanosPrimeiroAcesso
) => (await apiPlayMMN.post('/recuperaPlanos', reqArray)).data;
