import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { IReqPostPlayInsereParceiro } from '../../../api';
import { DefaultContainer } from '../../../components';
import { useForm } from '../../../hooks';
import useWindowSize from '../../../hooks/useWindowSize';

export function CadastroMVNO() {
  const [loadingSubmit, setLoadingSubmit] = useState(false);

  const navigate = useNavigate();
  const { isMobile } = useWindowSize();

  const { formData, changeForm } = useForm<IReqPostPlayInsereParceiro>({
    inscricaomunicipal: '',
    inscricaoestadual: '',
    numeroendereco: '',
    link_playstore: '',
    link_appstore: '',
    link_contrato: '',
    link_website: '',
    nomeparceiro: '',
    observacoes: '',
    companyname: '',
    asaastoken: '',
    companyref: '',
    mvnoparent: '',
    link_chat: '',
    tradename: '',
    consultor: '',
    endereco: '',
    telefone: '',
    surflogin: '',
    walletid: '',
    celular: '',
    bairro: '',
    email: '',
    token: '',
    cnpj: '',
    cep: '',
    logo: '',
  });
  return (
    <DefaultContainer
      page={''}
      title={'Cadastre sua MVNO'}
      subTitle={'Cadastre os dados essenciais'}
      showSearch={false}
      showAvatar={false}
    >
      CadMVNO
    </DefaultContainer>
  );
}
