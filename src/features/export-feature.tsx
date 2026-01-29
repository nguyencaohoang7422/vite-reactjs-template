import AccountManagersModule from '@/features/account-managers/pages/AccountManagersUI.tsx';
import { PATH_ROUTING } from '@/shared';
import type { RouteObject } from 'react-router-dom';
import StaffModule from './timekeeping/staff/pages/staff';

const features: RouteObject[] = [];

const exportAccountManager = {
  path: PATH_ROUTING.ACCOUNT_MANAGERS,
  element: <AccountManagersModule />,
};
const exportTimekeeping = {
  path: PATH_ROUTING.TIMEKEEPING,
  children: [
    {
      path: PATH_ROUTING.STAFF,
      element: <StaffModule />,
    },
  ],
};
features.push(exportAccountManager, exportTimekeeping);

export default features;
