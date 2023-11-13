import { useContext } from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { EnumProfileId } from '../../@types/IUser';
import { AuthContext } from '../../auth/auth';

interface AuthGuardProps {
  allowedRoles: EnumProfileId[];
}

export function AuthGuard({ allowedRoles }: AuthGuardProps) {
  const { user } = useContext(AuthContext);

  const location = useLocation();

  const currentUrl = location.pathname + location.search;

  // Verifica se tem usuário logado
  if (!user) return <Navigate to={'/login'} state={{ from: currentUrl }} replace />;

  // Verifica se o usuário tem acesso a rota
  if (!allowedRoles.includes(user?.profileid || 3))
    return <Navigate to='/forbidden' state={{ from: currentUrl }} replace />;

  return <Outlet />;
}
