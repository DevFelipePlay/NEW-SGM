import { Navigate, Route, Routes as RouterRoutes } from 'react-router-dom';

import { AuthGuard, SideBarRoutes } from '../..';
import ListPartner from '../../../Pages/CRM/Actions/ListPartner/ListPartner';
import {
  AdquirirLicenciamento,
  CadastrarUsuarioHomeParceiro,
  HomePlay,
  HomeUserMMN,
} from '../../../Pages/Home';
import Login from '../../../Pages/Login';

import HomeAdminMMN from '../../../Pages/Home/HomeMMN/HomeAdminMMN';

import Forbidden from '../../../Pages/Forbidden/Forbidden';
import {
  AtivacaoLinha,
  CadastroDadosFinanceiros,
  CadastroDeDistribuicaoDeValoresPorAtivacao,
  CadastroDeDistribuicaoDeValoresPorLicenciamento,
  CadastroDeDistribuicaoDeValoresPorPacotesDeChips,
  CadastroDeDistribuicaoDeValoresPorRecarga,
  CadastroDePacotesDeChip,
  CadastroDePacotesMMN,
  CadastroDosPlanosMMN,
  CadastroGraduacoesMMN,
  CadastroPontosModalidadeMMN,
  CadastroPremiacoesMMN,
  CadastroValoresETaxasMMN,
  CompraDePacotes,
  DashboardRelatorioUsuario,
  RedeUsuario,
  SolicitacoesPremios,
  SolicitacoesSaque,
} from '../../../Pages/MMN';
import { ConfiguracaoMMN } from '../../../Pages/MMN/ConfiguracaoMMN';
import { HistoricoDeSolicitacoesUsuario } from '../../../Pages/MMN/HistoricoDeSolicitacoesUsuario';
import InfoUserMMN from '../../../Pages/MMN/InfoUserMMN';
import DashBoardInfoUserMMN from '../../../Pages/MMN/InfoUserMMN/Tab0';
import SemLinhaAtiva from '../../../Pages/MMN/PrimeiroAcessoUsuarioMMN/VailidacaoAtivacao/ValidacaoAtivacao';
import NotFound from '../../../Pages/Notfound/NotFound';
import { CadastroDeDadosPessoaisUserMMN } from '../../../Pages/landingPageMultinivel/CadastroUserMMN/CadastroDeDadosPessoaisUserMMN/CadastroDeDadosPessoaisUserMMN';

export function AllRoutes() {
  return (
    <RouterRoutes>
      <Route
        index
        element={
          <Navigate to='primeiro-acesso-multinivel-parceiro/cadastro-de-pacotes-mmn' replace />
        }
      />
      {/* <Route path='/landingpage-indicacao/:idIndicacao' element={<LandingPageMultinivel />} />
      <Route path='/landingpage-indicacao/appousistem' element={<AppScreen />} /> */}
      <Route path='/sem-linha-ativa' element={<SemLinhaAtiva />} />
      <Route path='*' element={<NotFound />} />
      <Route
        path='/cadastro-usuario-mmn/:idIndicacao'
        element={<CadastroDeDadosPessoaisUserMMN />}
      />
      <Route path='/login' element={<Login />} />
      <Route path={'/forbidden'} element={<Forbidden />} />

      {/* Rotas Protegidas */}
      <Route element={<SideBarRoutes />}>
        <Route element={<AuthGuard allowedRoles={[-1, 0, 1]} />}>
          <Route path='/home-admin-mmn' element={<HomeAdminMMN />} />
          <Route path='/cadastro-usuario' element={<CadastrarUsuarioHomeParceiro />} />
          <Route path='home-play' element={<HomePlay />} />
          <Route path='/info-user-mmn' element={<InfoUserMMN />}>
            <Route path='dashboard-info-user-mmn' element={<DashBoardInfoUserMMN />} />
          </Route>
          <Route
            path='/daashboard-relatorio-usuario-mmn/:cpf'
            element={<DashboardRelatorioUsuario />}
          />

          <Route path='/solicitacoes-saque' element={<SolicitacoesSaque />} />
          <Route path='/solicitacoes-premios' element={<SolicitacoesPremios />} />
        </Route>

        <Route element={<AuthGuard allowedRoles={[-1, 0, 1]} />}>
          <Route path='/configuracao-mmn' element={<ConfiguracaoMMN />} />
        </Route>
        <Route path='/crm/parceiros' element={<ListPartner />} />
        <Route path='/home-usuario-mmn' element={<HomeUserMMN />} />
        <Route path='/adquirir-licenciamento-mmn' element={<AdquirirLicenciamento />} />
        <Route
          path='/historico-de-solicitacoes-usuario'
          element={<HistoricoDeSolicitacoesUsuario />}
        />
        <Route path='/rede-usuario' element={<RedeUsuario />} />
      </Route>
      {/* ///////////////////// */}
      {/* Primeiro acesso usuãrio */}
      <Route element={<AuthGuard allowedRoles={[-1, 0, 1, 7]} />}>
        <Route path='/primeiro-acesso-multinivel-usuario'>
          <Route path='compra-de-pacotes' element={<CompraDePacotes />} />
          <Route path='cadastro-dados-financeiros-usuario' element={<CadastroDadosFinanceiros />} />
          <Route path='ativacao-linha' element={<AtivacaoLinha />} />
        </Route>
      </Route>
      {/* //////// */}
      {/* Primeiro acesso Parceiro*/}
      <Route element={<AuthGuard allowedRoles={[-1, 0, 1]} />}>
        <Route path='/primeiro-acesso-multinivel-parceiro'>
          <Route path='cadastro-de-pacotes-mmn' element={<CadastroDePacotesMMN />} />
          <Route path='cadastro-de-pacotes-de-chips-mmn' element={<CadastroDePacotesDeChip />} />
          <Route path='cadastro-dos-planos-mmn' element={<CadastroDosPlanosMMN />} />
          <Route
            path='cadastro-de-distribuicao-de-valores-por-recarga'
            element={<CadastroDeDistribuicaoDeValoresPorRecarga />}
          />
          <Route
            path='cadastro-de-distribuicao-de-valores-por-ativacao'
            element={<CadastroDeDistribuicaoDeValoresPorAtivacao />}
          />
          <Route
            path='cadastro-de-distribuicao-de-valores-por-licenciamento'
            element={<CadastroDeDistribuicaoDeValoresPorLicenciamento />}
          />
          <Route
            path='cadastro-de-distribuicao-de-valores-por-pacote-de-chips'
            element={<CadastroDeDistribuicaoDeValoresPorPacotesDeChips />}
          />
          <Route path='cadastro-graduacoes' element={<CadastroGraduacoesMMN />} />
          <Route path='cadastro-pontos-por-modalidade' element={<CadastroPontosModalidadeMMN />} />
          <Route path='cadastro-valores-e-taxas' element={<CadastroValoresETaxasMMN />} />
          <Route path='cadastro-premiacoes' element={<CadastroPremiacoesMMN />} />
        </Route>
      </Route>
      {/* //////// */}
    </RouterRoutes>
  );
}
