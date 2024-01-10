import { IReqPostPlayGeraFaturaLicenciamento } from '.';
import apiPlay from '../../../../services/apiPlay';

export const postPlayGeraFaturaLicenciamento = async (req: IReqPostPlayGeraFaturaLicenciamento) =>
  (await apiPlay.post('/geraFaturaLicenciamento', req)).data;
