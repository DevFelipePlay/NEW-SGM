export interface IReqPostPlayInsereParceiro {
  token: string;
  companyname: string;
  cnpj: string;
  tradename: string;
  logo: string | Blob;
  nomeparceiro: string;
  email: string;
  celular: string;
  telefone: string;
  cep: string;
  endereco: string;
  numeroendereco: string;
  bairro: string;
  inscricaomunicipal?: string;
  inscricaoestadual?: string;
  observacoes?: string;
  walletid?: string;
  link_playstore?: string;
  link_appstore?: string;
  link_website?: string;
  link_chat?: string;
  link_contrato?: string;
  consultor?: string;
  companyref?: string;
  mvnoparent?: string;
  asaastoken?: string;
  surflogin?: string;
}
