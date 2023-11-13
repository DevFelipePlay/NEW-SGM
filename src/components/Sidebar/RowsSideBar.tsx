import { ReactNode } from 'react';
import { GiHumanPyramid } from 'react-icons/gi';
import { MdDvr } from 'react-icons/md';
import iconPlay from '../../assets/MMNImg/iconeDrawer.png';

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
    label: 'Play Admin',
    icon: <img src={iconPlay} style={{ width: '22px' }} />,
    to: '/home-play',
    listItemsTabBar: [
      {
        to: '',
        render: true,
        label: 'CRM',
        icon: <MdDvr />,
      },
    ],
  },

  {
    switches: '',
    render: true,
    label: 'Modulo Multinivel',
    icon: <GiHumanPyramid />,
    to: '/home-admin-mmn',
    listItemsTabBar: [
      // {
      //   render: true,
      //   label: 'Teste Home',
      //   icon: <BiHomeSmile />,
      //   to: '',
      // },
      // {
      //   render: true,
      //   label: 'Teste Home',
      //   icon: <BiHomeSmile />,
      //   to: '',
      // },
      // {
      //   render: true,
      //   label: 'Teste Home',
      //   icon: <BiHomeSmile />,
      //   to: '',
      // },
    ],
  },
];
