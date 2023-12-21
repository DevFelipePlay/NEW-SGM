import { Outlet } from "react-router-dom";
import { Sidebar, SidebarMobile } from "../../components";
import useWindowSize from "../../hooks/useWindowSize";

export function SideBarRoutes() {
  const { isMobile } = useWindowSize();
  return (
    <>
      {isMobile ? <SidebarMobile /> : <Sidebar />}
      <Outlet />
    </>
  );
}
