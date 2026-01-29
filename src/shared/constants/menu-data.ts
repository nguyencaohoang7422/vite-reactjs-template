import { PATH_ROUTING } from '@/shared';

export type MenuItem = {
  id: string;
  position: number;
  link: string;
  icon: string;
  key: string;
  menuItems?: MenuItem[];
  hidden?: boolean;
  functions?: string[];
};
export const menuData2: MenuItem[] = [
  {
    icon: 'user-list',
    id: 'managers',
    position: 0,
    key: 'managers',
    link: PATH_ROUTING.ACCOUNT_MANAGERS,
  },
  {
    id: 'timekeeping',
    position: 1,
    link: PATH_ROUTING.TIMEKEEPING,
    icon: 'map-trifold',
    key: 'timekeeping',
    menuItems: [
      {
        id: 'staff',
        icon: 'staff',
        link: PATH_ROUTING.STAFF,
        position: 1,
        key: 'staff',
      },
    ],
  },
  // Traffic
];
