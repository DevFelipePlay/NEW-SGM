import React, { useContext } from 'react';
import { Navigate, Route } from 'react-router-dom';
import { AuthContext } from '../../components/Auth/auth';

// Nova interface que agrupa as propriedades adicionais

interface SuperAdminGuardProps {
  superRequired: boolean;
  cadastroCompletoRequired: boolean;
}

const SuperAdminGuard: React.FC<SuperAdminGuardProps> = ({
  superRequired,
  cadastroCompletoRequired,
  ...routeProps
}) => {
  const { user } = useContext(AuthContext);

  // Verifica se tem usuário logado
  if (!user) {
    return <Navigate to='/login' replace />;
  }

  // Verifica se o usuário tem super como true e cadastrocompleto como 0
  if (superRequired && !user.super) {
    return <Navigate to='/home-usuario-mmn' replace />;
  }

  if (cadastroCompletoRequired && user.primeiroacessoconcluidoparceirommn) {
    return <Navigate to='/home-admin-mmn' replace />;
  }

  if (superRequired && user.super && user.primeiroacessoconcluidoparceirommn) {
    return <Navigate to='/primeiro-acesso-multinivel-parceiro/cadastro-de-pacotes-mmn' />;
  }

  // Se tudo estiver correto, renderiza a rota
  return <Route {...routeProps} />;
};

export default SuperAdminGuard;
