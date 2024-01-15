import { IReqPostPlayListarCorSistemaPorCompanyRef } from '.';
import apiPlaySgm from '../../../services/apiPlaySgm';

export const postPlayListarCorSistemaPorCompanyRef = async (
  req: IReqPostPlayListarCorSistemaPorCompanyRef
) => (await apiPlaySgm.post('/listarCorSistemaPorCompanyRef', req)).data;
