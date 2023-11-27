import { ReactNode, createContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
//
import useStorage from '../../hooks/useStorage';
//

import moment from 'moment';
import { IUser } from '../../@types/IUser';
import apiPlay from '../../services/apiPlay';

type AuthContextTypes = {
  user: IUser | null;
  loadingAuth: boolean;
  loadingSystem: boolean;
  signIn: (cpf: string, senha: string, isOnBg?: boolean) => void;
  reSignIn: () => void;
  signOut: () => void;
};

export const AuthContext = createContext<AuthContextTypes>({} as AuthContextTypes);

export default function AuthProvider({ children }: { children: ReactNode }) {
  const navigate = useNavigate();

  const { getItem, setItem } = useStorage();

  const [loadingSystem, setLoadingSystem] = useState(true);
  const [loadingAuth, setLoadingAuth] = useState(false);
  const [user, setUser] = useState<IUser | null>(null);

  function signIn(cpf: string, senha: string, isOnBg?: boolean) {
    setLoadingAuth(true);

    const loginTime = moment().toISOString();
    let dados = {
      cpf: cpf,
      password: senha,
    };

    apiPlay
      .post('login', dados)
      .then((response) => {
        if (response.data.profileid === 5) return toast.error('CPF não encontrado'); // Perfil está Excluído
        if (response.data.profileid === 3 && response.data.cpf.length === 11)
          return toast.warning('Você não possui acesso a plataforma!'); //Perfil de Cliente PF

        setUser(response.data);
        setItem('loginTime', loginTime);
        setItem('usr', JSON.stringify(response.data));
        setItem('usr_c', JSON.stringify({ cpf: cpf, senha: senha }));
        setLoadingAuth(false);

        !isOnBg && navigate('/primeiro-acesso-multinivel-parceiro/cadastro-de-pacotes-mmn');
      })
      .catch((error) => {
        console.log(error);

        setLoadingAuth(false);

        if (error.response.status === 550) return !isOnBg && toast.error('Senha incorreta');

        if (error.response.status === 551) return !isOnBg && toast.error('CPF não encontrado');

        !isOnBg && toast.error('Erro ao logar no sistema');
      });
  }

  function reSignIn() {
    let usr_c = getItem('usr_c');
    if (usr_c) {
      let { cpf, senha } = JSON.parse(usr_c);
      signIn(cpf, senha, true);
    }
  }

  function signOut() {
    navigate('/login');
    localStorage.clear();
    sessionStorage.clear();
    setUser(null);
    window.location.reload();
  }

  useEffect(() => {
    //loadStorage()
    let currentDate = moment().date().toString();
    let lastAccessDate = getItem('lastAccessDate');

    if (!lastAccessDate || currentDate !== lastAccessDate) {
      setItem('lastAccessDate', currentDate);
    }

    let usr = getItem('usr');
    if (usr) {
      setUser(JSON.parse(usr));
    }
    setLoadingSystem(false);
  }, []);

  useEffect(() => {
    if (!user) return;

    const TIME_TO_UPDATE = 1800000; //30min
    const loopDeLogin = setInterval(reSignIn, TIME_TO_UPDATE);

    return () => clearInterval(loopDeLogin);
  }, [user]);

  useEffect(() => {
    const lastLoginTime = getItem('loginTime');
    console.log(lastLoginTime);
    if (lastLoginTime) {
      const dozeHorasAtras = moment().subtract(12, 'hours');
      const horarioLogin = moment(lastLoginTime);

      if (horarioLogin.isBefore(dozeHorasAtras)) {
        signOut();
      }
    }
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        loadingAuth,
        loadingSystem,
        signIn,
        reSignIn,
        signOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
