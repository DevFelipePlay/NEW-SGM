import { IReqPostPlayCadastroValoresETaxasMMN } from '.';
import { apiPlayMMN } from '../../services/apiPlayMMN';

export const postPlayCadastroValoresETaxasMMN = async (
  reqArray: IReqPostPlayCadastroValoresETaxasMMN
) => (await apiPlayMMN.post('/cadastrartaxas', reqArray)).data;
