import { PATH_ROUTING } from '@/shared';
import type { RouteObject } from 'react-router-dom';
import AccountManagersModule from '@/features/account-managers/pages/AccountManagersUI.tsx';

const features: RouteObject[] = [];

const exportAccountManager = {
  path: PATH_ROUTING.ACCOUNT_MANAGERS,
  element: <AccountManagersModule />,
};
const exportTimekeeping = {
  path: PATH_ROUTING.ACCOUNT_MANAGERS,
  element: <AccountManagersModule />,
};
features.push(exportAccountManager, exportTimekeeping);

export default features;
