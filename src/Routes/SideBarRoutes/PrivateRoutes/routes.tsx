import { Navigate, Route, Routes as RouterRoutes } from 'react-router-dom';

import { AuthGuard, SideBarRoutes } from '../..';
import ListPartner from '../../../Pages/CRM/Actions/ListPartner/ListPartner';
import { HomePlay } from '../../../Pages/Home';
import HomeAdminMMN from '../../../Pages/Home/HomeMMN/HomeAdminMMN';
import HomeUserMMN from '../../../Pages/Home/HomeMMN/HomeUserMMN';
import Login from '../../../Pages/Login';
import InfoUserMMN from '../../../Pages/MMN/InfoUserMMN';
import DashBoardInfoUserMMN from '../../../Pages/MMN/InfoUserMMN/Tab0';

import {
  CadastroDePacotesMMN,
  CadastroDosPlanosMMN,
  CadastroGraduacoesMMN,
  CadastroPontosModalidadeMMN,
  CadastroPremiacoesMMN,
  CadastroValoresETaxasMMN,
} from '../../../Pages/MMN/PrimeiroAcessoMMN';
import { CadastroNiveisDeUsuario } from '../../../Pages/MMN/PrimeiroAcessoMMN/CadastroNiveisDeUsuario';
import { EscolhaDeCompras, LandingPageMultinivel } from '../../../Pages/landingPageMultinivel';
import { CadastroDeDadosPessoaisUserMMN } from '../../../Pages/landingPageMultinivel/CadastroUserMMN/CadastroDeDadosPessoaisUserMMN/CadastroDeDadosPessoaisUserMMN';

export function AllRoutes() {
  return (
    <RouterRoutes>
      <Route index element={<Navigate to='primeiro-acesso-multinivel' replace />} />
      <Route path='/landingpage-indicacao' element={<LandingPageMultinivel />} />
      <Route path='/cadastro-user-mmn'>
        <Route
          path='cadastro-de-dados-pessoais-user-mmn'
          element={<CadastroDeDadosPessoaisUserMMN />}
        />
        <Route path='escolha-de-compras' element={<EscolhaDeCompras />} />
      </Route>
      <Route path='/login' element={<Login />} />

      {/* Rotas Protegidas */}

      <Route element={<AuthGuard allowedRoles={[-1, 0, 2, 4, 5, 6]} />}>
        <Route element={<SideBarRoutes />}>
          <Route path='/home-admin-mmn' element={<HomeAdminMMN />} />
          <Route path='/home-user-mmn' element={<HomeUserMMN />} />
          <Route path='home-play' element={<HomePlay />} />
          <Route path='/info-user-mmn' element={<InfoUserMMN />}>
            <Route path='dashboard-info-user-mmn' element={<DashBoardInfoUserMMN />} />
          </Route>

          {/* Primeiro acesso */}
          <Route path='/primeiro-acesso-multinivel'>
            <Route path='cadastro-de-pacotes-mmn' element={<CadastroDePacotesMMN />} />
            <Route path='cadastro-dos-planos-mmn' element={<CadastroDosPlanosMMN />} />
            <Route path='cadastro-niveis-de-usuario' element={<CadastroNiveisDeUsuario />} />
            <Route path='cadastro-graduacoes' element={<CadastroGraduacoesMMN />} />
            <Route
              path='cadastro-pontos-por-modalidade'
              element={<CadastroPontosModalidadeMMN />}
            />
            <Route path='cadastro-valores-e-taxas' element={<CadastroValoresETaxasMMN />} />
            <Route path='cadastro-premiacoes' element={<CadastroPremiacoesMMN />} />
          </Route>
          {/* //////// */}

          <Route path='/crm/parceiros' element={<ListPartner />} />
        </Route>
      </Route>
    </RouterRoutes>
  );
}
