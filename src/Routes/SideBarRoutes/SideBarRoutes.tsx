import { Outlet } from 'react-router-dom';
import { Sidebar } from '../../components';

export function SideBarRoutes() {
  return (
    <>
      <Sidebar />
      <Outlet />
    </>
  );
}
