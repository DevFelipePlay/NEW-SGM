import { ReactNode } from 'react';
import { BiHomeSmile } from 'react-icons/bi';
import { GiHumanPyramid } from 'react-icons/gi';
import { IoSettingsOutline } from 'react-icons/io5';

export interface IListItemsTabBar {
  render: boolean;
  label: ReactNode | null;
  icon: ReactNode;
  to: string | null;
}
export interface IRowsSideBar {
  switches: string;
  render?: boolean | undefined;
  label?: any;
  icon?: null | ReactNode;
  to?: string;
  listItemsTabBar?: IListItemsTabBar[];
}

export const RowsSideBar: IRowsSideBar[] = [
  {
    switches: '',
    render: true,
    label: 'Modulo Multinivel',
    icon: <GiHumanPyramid />,
    to: '/home-admin-mmn',
    listItemsTabBar: [
      {
        render: true,
        label: 'Home Admin',
        icon: <BiHomeSmile />,
        to: '/home-admin-mmn',
      },
      {
        render: true,
        label: 'Home',
        icon: <BiHomeSmile />,
        to: '/home-usuario-mmn',
      },
      {
        render: true,
        label: 'Configurações Gerais',
        icon: <IoSettingsOutline />,
        to: 'configuracao-mmn',
      },
    ],
  },
];
