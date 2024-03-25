import { useContext } from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { EnumProfileId } from "../../@types/IUser";
import { AuthContext } from "../../components/Auth/auth";

interface AuthGuardProps {
  allowedRoles: EnumProfileId[];
}

export function AuthGuard({ allowedRoles }: AuthGuardProps) {
  const { user } = useContext(AuthContext);

  const location = useLocation();

  const currentUrl = location.pathname + location.search;
  console.log(user);
  // Verifica se tem usuário logado
  if (!user) return <Navigate to={"/"} state={{ from: currentUrl }} replace />;

  // Verifica se o usuário tem acesso a rota
  if (!allowedRoles.includes(user?.profileid_multinivel || 3))
    return <Navigate to="/forbidden" state={{ from: currentUrl }} replace />;

  return <Outlet />;
}
