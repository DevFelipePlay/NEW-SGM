import { useContext } from 'react';
import { AuthContext } from '../components/Auth/auth';

export default function useUser() {
  const { user } = useContext(AuthContext);

  const isClientePj = user?.profileid === 3 && user?.cpf.length > 11;
  const isAdminPlay = user ? user?.profileid <= 1 && user?.companyid === 46 : undefined;
  const isParceiroRevendedor = !!user?.parceirorevendedor;
  const isRevendedor = user?.profileid === 4;
  const isFranquia = user?.profileid === 6;
  const isAdmin = user ? user?.profileid <= 1 : undefined;
  const isSuper = user ? user?.profileid < 1 : undefined;
  const isUltra = user ? user?.profileid < 0 : undefined;
  const isPosPago = !!user?.pospago;
  const isAtendente = user?.profileid === 2;

  const isIlberIrlanLeandro = ['01269952145', '02767237163', '70941718115'].includes(
    user?.cpf || ''
  );

  const userInfoString = JSON.stringify({
    cpf: user?.cpf,
    name: user?.name,
    parceiro: user?.parceiro,
  });

  function checkAccess(page: string, nivel?: boolean) {
    if (user?.pages === undefined || user?.pages === null) return nivel || false;
    return user?.pages.includes(page);
  }

  return {
    isParceiroRevendedor,
    isIlberIrlanLeandro,
    isAtendente,
    userInfoString,
    isRevendedor,
    isFranquia,
    isClientePj,
    isAdminPlay,
    checkAccess,
    isPosPago,
    isAdmin,
    isSuper,
    isUltra,
    user,
  };
}
