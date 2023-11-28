import apiPlay from '../../../services/apiPlay';
import { IReqPostPlayGeraFaturaLicenciamento } from './IReqPostPlayGeraFaturaLicenciamento';

export const postPlayGeraFaturaLicenciamento = async (req: IReqPostPlayGeraFaturaLicenciamento) =>
  (await apiPlay.post('/geraFaturaLicenciamento', req)).data;
