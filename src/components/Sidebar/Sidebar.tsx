import {
  Avatar,
  Box,
  Button,
  Modal,
  Typography,
  keyframes,
} from "@mui/material";
import { CSSProperties, useContext, useEffect, useRef, useState } from "react";
import { AiOutlineMenuUnfold } from "react-icons/ai";
import { FaMoneyBillTransfer } from "react-icons/fa6";
import { IoSettingsOutline } from "react-icons/io5";
import { LiaAwardSolid } from "react-icons/lia";
import { PiSignOut } from "react-icons/pi";
import { useNavigate } from "react-router-dom";
import backgroundTab from "../../assets/MMNImg/TabBarBackground.jpg";

import { ReactNode } from "react";
import { BiHomeSmile } from "react-icons/bi";
import { GiHumanPyramid } from "react-icons/gi";
import useUser from "../../hooks/useUser";
import useWindowSize from "../../hooks/useWindowSize";
import { ExtrairLetras } from "../../utils";
import { AuthContext } from "../Auth/auth";

export function Sidebar(): JSX.Element {
  const navigate = useNavigate();
  const { isMobile } = useWindowSize();
  ///////////////////////////////////////////////////////////Estilização //////////////////////////////////////////////////////////////////////////////
  // Estados para controlar o Drawer, TabBar e ícone ativo
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isTabBarOpen, setIsTabBarOpen] = useState(false); // Estado de abertura Tabbar
  const [activeIcon, setActiveIcon] = useState(""); //Estado de ativação do icone da SideBar Ativo
  const [open, setOpen] = useState(false); // Dialog
  const { user } = useUser();

  const displayFlexComponent: CSSProperties = {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  };

  // Largura da sidebar e tabBar abertas
  const sidebarWidth = "250px";
  const tabWidth = "400px";

  // Estilos quando a sidebar está aberta
  const sidebarOpenStyles: CSSProperties = {
    width: sidebarWidth,
  };

  // Estilos da sidebar
  const sidebarStyles: CSSProperties = {
    ...displayFlexComponent,
    display: `${isMobile ? "none" : "flex"}`,
    flexDirection: "column",
    height: "100vh",
    width: "70px",
    backgroundColor: "var(--backGround-sideBar-color)",
    position: "fixed",
    top: 0,
    left: 0,
    zIndex: 100,
    transition: "width 0.3s",
    userSelect: "none",
  };
  const sidebarIconActiveStyles: CSSProperties = {
    backgroundColor: "#444", // Cor de fundo quando o ícone da sidebar está ativo
    color: "var(--primary-color)",
  };

  //Animação padrão para os botões da sidebar e tabbar
  const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }`;
  // Estilos para os ícones da sidebar
  const sidebarIconStyles: CSSProperties = {
    display: "flex",
    alignItems: "center",
    justifyContent: "initial",
    //@ts-ignore
    height: "50px",
    padding: "1rem",
    width: "80%",
    fontSize: "1.5rem",
    color: "var(--text-header-color)",
    cursor: "pointer",
    borderRadius: "10px",
  };
  // Lista dos textos dos botões da sideBar Aberta
  const sidebarIconTextStyles: CSSProperties = {
    marginLeft: "20px",
    fontSize: "1rem",

    animation: `${fadeIn} 0.5s ease-in-out`, // Aplicar animação de fade
  };
  //Estilos do icone ativo do botão de sair da Sidebar
  const sidebarIconExitActiveStyles: CSSProperties = {
    backgroundColor: "#444", // Cor de fundo quando o ícone de sair está ativo
    color: "red",
  };

  // Estilos quando a tabBar está aberta
  const tabOpenStyles: CSSProperties = {
    width: tabWidth,
  };

  //Estilos do container da Tab Bar

  const tabBarStyles: CSSProperties = {
    backgroundImage: `url(${backgroundTab})`,
    backgroundSize: "cover",
    backdropFilter: "blur(10px)",
    height: "100vh",
    position: "fixed",
    top: "0",
    transition: "width 0.3s, margin-left 0.3s",
    width: isTabBarOpen ? "400px" : "0",
    marginLeft: isDrawerOpen ? sidebarWidth : "70px",
    borderTopRightRadius: "10px",
    borderBottomRightRadius: "10px",
    zIndex: 100,
  };
  //Estilização do titulo das abas da Tabbar
  const titleTabBar: CSSProperties = {
    padding: "0rem 2.5rem",
    marginTop: "2rem",
    fontSize: "1.5rem",
    color: "var(--text-color)",
    display: isTabBarOpen ? "flex" : "none",
    animation: `${fadeIn} 0.5s ease-in-out`, // Aplicar animação de fade
  };

  ///////////////////////////////////////////////////////////////    FUNÇÔES    /////////////////////////////////////////////////////////////////////////

  //SingOut
  const { signOut } = useContext(AuthContext);

  const toggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };
  const toggleTabBar = () => {
    setIsTabBarOpen(!isTabBarOpen);
  };

  //Função de redenrização do item selecionado

  const handleIconClick = (
    icon: string,
    to: string | undefined,
    listItemsTabBar?: IListItemsTabBar[]
  ) => {
    if (to) {
      setActiveIcon(icon); // Ativa ou desativa o ícone
      if (listItemsTabBar && listItemsTabBar.length > 0) {
        setIsTabBarOpen(true);
      } else {
        setIsTabBarOpen(false);
      }
      navigate(to);
    }
  };

  // Função de abertura do modal de signOut
  const handleClickOpen = () => {
    setOpen(true);
  };

  // Função de Fechamento do modal de signOut
  const handleClose = () => {
    setOpen(false);
  };
  //Funções de click do botão de sair da sideBar
  // @ts-ignore
  const handleExitClick = (icon: string) => {
    setActiveIcon(icon); // Ativa ou desativa o ícone
    handleClickOpen();
  };

  ////////////////////////////////// Rotas Sidebar /////////////////////////////////////
  interface IListItemsTabBar {
    render: boolean;
    label: ReactNode | null;
    icon: ReactNode;
    to: string | null;
  }
  interface IRowsSideBar {
    switches: string;
    render?: boolean | undefined;
    label?: any;
    icon?: null | ReactNode;
    to?: string;
    listItemsTabBar?: IListItemsTabBar[];
  }

  const RowsSideBar: IRowsSideBar[] = [
    {
      switches: "",
      render: true,
      label: "Módulo Multinivel",
      icon: <GiHumanPyramid />,
      to:
        user?.profileid_multinivel === 7
          ? "home-usuario-mmn"
          : "home-admin-mmn",
      listItemsTabBar: [
        {
          render: true,
          label: "Home",
          icon: <BiHomeSmile />,
          to:
            user?.profileid_multinivel === 7
              ? "/home-usuario-mmn"
              : "/home-admin-mmn",
        },

        {
          render: user?.super ? true : false,
          label: "Solicitações de Saque",
          icon: <FaMoneyBillTransfer />,
          to: "solicitacoes-saque",
        },
        {
          render: user?.super ? true : false,
          label: "Solicitações de Prêmios",
          icon: <LiaAwardSolid />,
          to: "solicitacoes-premios",
        },
        {
          render: user?.super ? true : false,
          label: "Configurações Gerais",
          icon: <IoSettingsOutline />,
          to: "configuracao-mmn",
        },
      ],
    },
  ];
  /////////////////////////////////////////////////////////////////////////////////////

  //Dialog
  function AlertDialog() {
    const style: CSSProperties = {
      ...displayFlexComponent,
      flexDirection: "column",
      position: "absolute" as "absolute",
      top: "50%",
      left: "50%",
      transform: "translate(-50%, -50%)",
      width: 400,
      borderRadius: "10px",
      boxShadow: "24",
      backgroundColor: "var(--backGround-sideBar-color)",
      color: "var(--text-color)",
      padding: "4rem",
      textAlign: "center",
      border: "none",
    };

    return (
      <>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <Typography
              id="modal-modal-title"
              variant="h6"
              component="h2"
              sx={{ mb: 3 }}
            >
              Realmente deseja sair?
            </Typography>
            <Button onClick={() => signOut()} variant="contained" color="error">
              Sair
            </Button>
          </Box>
        </Modal>
      </>
    );
  }

  //Switch de Rederinzação por click da tabBar
  const renderTabContent = () => {
    const activeItem = RowsSideBar.find((item) => item.label === activeIcon);

    switch (activeIcon) {
      case "Play Admin":
      case "Home":
      case "Minha operadora":
      case "Módulo Multinivel":
        return renderTabItems(activeItem?.listItemsTabBar || []);
      default:
        return null;
    }
  };
  //
  // Costumização e redenrização de itens da TabBar
  const renderTabItems = (tabItems: IListItemsTabBar[]) => {
    return tabItems.map((item, index) => (
      <Box key={index}>
        {item.render && (
          <Box
            sx={{ width: "100%" }}
            onClick={() => {
              navigate(item.to || "");
              setIsTabBarOpen(false);
            }}
          >
            <Typography
              sx={{
                ...displayFlexComponent,
                flexDirection: "column",
                backdropFilter: "blur(50px)",
                borderRadius: "10px",
                animation: `${fadeIn} 0.5s ease-in-out`,
                boxShadow: "rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px",
                color: "var(--text-color)",
                fontSize: "1rem",
                py: 1,
                mb: 2,
                cursor: "pointer",
                fontWeight: "700",
                transition: "background-color 0.3s, color 0.3s", // Adicione uma transição suave
                "&:hover": {
                  backgroundColor: "var(--backGround-button-hover-color)", // Cor de fundo no hover
                  color: "var(--primary-color)", // Cor do texto no hover
                },
              }}
            >
              {item.render && (
                <>
                  <Box sx={displayFlexComponent}>
                    <Typography sx={{ mr: "1rem", fontSize: "1.2rem" }}>
                      {item.icon}
                    </Typography>
                    <Typography sx={{ fontSize: "1rem" }}>
                      {item.label}
                    </Typography>
                  </Box>
                </>
              )}
            </Typography>
          </Box>
        )}
      </Box>
    ));
  };

  const tabBarRef = useRef<HTMLDivElement>(null);

  function handleCloseMouseDonwTabBar() {
    // Função para fechar a TabBar ao clicar fora dela
    const handleClickOutside = (event: MouseEvent) => {
      if (
        tabBarRef.current &&
        !tabBarRef.current.contains(event.target as Node)
      ) {
        setIsTabBarOpen(false);
      }
    };

    // Adiciona o event listener ao montar o componente
    document.addEventListener("mousedown", handleClickOutside);

    // Remove o event listener ao desmontar o componente
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }

  useEffect(() => {
    handleCloseMouseDonwTabBar();
  }, []);

  return (
    <Box>
      <Box
        style={{
          ...sidebarStyles,
          ...(isDrawerOpen ? sidebarOpenStyles : {}),
        }}
      >
        <Box
          sx={{
            color: "var(--text-header-color)",
            cursor: "pointer",
            width: "100%",
            height: "auto",
            position: "absolute",
            top: "2px",
          }}
          onClick={toggleDrawer}
        >
          <Box>
            {isDrawerOpen ? (
              <Box
                sx={{
                  position: "absolute",
                  padding: "1rem",
                  height: "50px",
                  top: "1rem",
                  right: "1rem",
                  animation: `${fadeIn} 0.5s ease-in-out`, // Aplicar animação de fade
                }}
              >
                <>&#10006;</>
              </Box>
            ) : (
              <AiOutlineMenuUnfold
                style={{ fontSize: "2rem", margin: "1rem" }}
              />
            )}
          </Box>
        </Box>
        {isDrawerOpen && (
          <Avatar
            sx={{
              width: "4rem",
              height: "4rem",
              animation: `${fadeIn} 0.5s ease-in-out`, // Aplicar animação de fade
              position: "absolute",
              top: "3rem",
            }}
          >
            {user?.logotipo ? (
              <img
                src={`data:image/png;base64,${user?.logotipo}`}
                style={{
                  width: "120px",
                  backgroundColor: "var(--backGround-default)",
                }}
              />
            ) : (
              <ExtrairLetras nome={user?.parceiro} />
            )}
          </Avatar>
        )}
        {/* Rows SideBar */}

        <Box
          sx={{
            ...displayFlexComponent,
            maxHeight: "400px",
            width: "100%",
            flexDirection: "column",
            textAlign: "center",
            whiteSpace: "nowrap",
          }}
        >
          {RowsSideBar.map((item, index) => (
            <Box
              sx={{
                ...sidebarIconStyles,
                ...(activeIcon === item.label ? sidebarIconActiveStyles : {}),
                height: "auto",
              }}
              key={index}
              onClick={() =>
                handleIconClick(item.label, item.to, item.listItemsTabBar)
              }
            >
              {item.icon}
              {isDrawerOpen && (
                <Typography sx={sidebarIconTextStyles}>{item.label}</Typography>
              )}
            </Box>
          ))}
        </Box>

        {/* /////////////// */}

        <Box
          sx={{
            ...displayFlexComponent,
            flexDirection: "column",
            position: "absolute",
            bottom: "10px",
            width: "100%",
          }}
        >
          <Box
            sx={{
              ...sidebarIconStyles,
              ...(activeIcon === "configurações"
                ? sidebarIconActiveStyles
                : {}),
              alignItems: "center",
              justifyContent: "initial",
            }}
            onClick={() => handleIconClick("configurações", "")}
          >
            <IoSettingsOutline />
            {isDrawerOpen && (
              <Typography sx={sidebarIconTextStyles}> Configurações</Typography>
            )}
          </Box>
          <Box
            sx={{
              ...sidebarIconStyles,
              ...(activeIcon === "sair" ? sidebarIconExitActiveStyles : {}),
            }}
            onClick={() => handleClickOpen()}
          >
            <PiSignOut />
            {isDrawerOpen && (
              <Typography sx={sidebarIconTextStyles}> Sair</Typography>
            )}
          </Box>
        </Box>
      </Box>

      <Box
        ref={tabBarRef}
        sx={{
          ...tabBarStyles,
          ...(isTabBarOpen ? tabOpenStyles : {}),
          boxShadow:
            "rgba(0, 0, 0, 0.507) 0px 14px 28px, rgba(0, 0, 0, 0.22) 0px 10px 10px",
        }}
      >
        {activeIcon === "Play Admin" && (
          <Typography sx={titleTabBar}>Play Admin</Typography>
        )}
        {activeIcon === "Home" && (
          <Typography sx={titleTabBar}>Home</Typography>
        )}
        {activeIcon === "Minha operadora" && (
          <Typography sx={titleTabBar}>Minha operadora</Typography>
        )}
        {activeIcon === "Multi Nivel" && (
          <Typography sx={titleTabBar}>Multi Nivel</Typography>
        )}
        <Box sx={{ width: "100%" }}>
          {isTabBarOpen && (
            <Box
              sx={{
                animation: `${fadeIn} 0.5s ease-in-out`,
                width: "100%",
                flexDirection: "column",
                userSelect: "none",
                p: 4,
                pt: 4,
              }}
            >
              {renderTabContent()}
            </Box>
          )}
          <Box
            sx={{
              display: !isTabBarOpen ? "none" : "flex",
              animation: `${fadeIn} 0.5s ease-in-out`,
              height: "50px",
              position: "absolute",
              color: "var(--text-header-color)",
              top: "0px",
              right: "0px",
              px: 2,
              pt: 2,
              userSelect: "none",
              cursor: "pointer",
            }}
            onClick={toggleTabBar}
          >
            <>&#10006;</>
          </Box>
        </Box>
      </Box>
      <AlertDialog />
    </Box>
  );
}
