import { IReqPostPlayCadastroPacotesVenda } from '.';
import { apiPlayMMN } from '../../../services/apiPlayMMN';

export const postPlayCadastroPacotesVendaChip = async (
  reqArray: IReqPostPlayCadastroPacotesVenda[]
) => (await apiPlayMMN.post('/CadastraPacoteVendaChip', reqArray)).data;
