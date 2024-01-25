import { IReqPostPlayInsereParceiro } from '.';
import apiPlaySgm from '../../../services/apiPlaySgm';

export const postPlayInsereParceiro = async (req: IReqPostPlayInsereParceiro) =>
  (await apiPlaySgm.post('/insereParceiro', req)).data;
