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
    link: '/account-managers',
  },
  {
    id: 'cameraGroup',
    icon: 'details',
    key: 'cameraGroup',
    link: '/camera-group',
    position: 1,
    menuItems: [
      {
        icon: 'details',
        id: 'listCameraGroup',
        position: 0,
        key: 'listCameraGroup',
        link: '/list',
      },
      {
        id: 'showCameraGroup',
        key: 'showCameraGroup',
        position: 1,
        link: '/show',
        hidden: true,
        icon: 'details',
      },
      {
        id: 'addCameraGroup',
        key: 'addCameraGroup',
        position: 2,
        link: '/add',
        icon: 'details',
      },
      {
        id: 'editCameraGroup',
        key: 'editCameraGroup',
        position: 3,
        link: '/edit',
        hidden: true,
        icon: 'details',
      },
    ],
  },
  {
    id: 'liveview',
    position: 4,
    link: '/live-view',
    icon: 'live-view',
    key: 'liveView',
  },
  {
    id: 'listregisuser',
    position: 6,
    link: '/list-user-regis',
    icon: 'list-user',
    key: 'listregisuser',
  },
  {
    id: 'ailiveview',
    position: 6,
    link: '/ai-liveview',
    icon: 'ai-liveview',
    key: 'ailiveview',
  },
  {
    id: 'aiSettings',
    position: 6,
    link: '/ai-settings',
    icon: 'gear',
    key: 'aiSettings',
  },

  {
    id: 'aiSearch',
    position: 6,
    link: '/ai-search',
    icon: 'search',
    key: 'aiSearch',
  },
  {
    id: 'warning',
    position: 6,
    link: '/ai-warning',
    icon: 'siren',
    key: 'aiWarning',
  },
  {
    id: 'playback',
    position: 5,
    link: '/playback',
    icon: 'playback',
    key: 'playback',
  },
  {
    id: 'camera_find_camera_by_link',
    position: 5,
    icon: 'camera',
    link: '/xem-duong-dan',
    hidden: true,
    key: 'findCameraByLink',
  },
  {
    id: 'device-management',
    position: 10,
    link: '/devices-management',
    icon: 'cpu',
    key: 'deviceManagement',
  },
  {
    id: 'statistic-event',
    position: 10,
    link: '/statistic-event',
    icon: 'chart-icon',
    key: 'statisticEvent',
  },
  {
    id: 'Account',
    position: 1,
    link: '/account',
    icon: 'bullet-menu',
    hidden: true,
    key: 'account',
  },
  {
    id: 'minimap',
    position: 1,
    link: '/minimap',
    icon: 'map-trifold',
    key: 'minimap',
  },
  {
    id: 'timekeeping',
    position: 1,
    link: '/timekeeping',
    icon: 'map-trifold',
    key: 'timekeeping',
  },

  // Traffic
  {
    id: 'traffic',
    position: 10,
    link: '/traffic',
    icon: 'traffic',
    key: 'traffic',
    menuItems: [
      {
        id: 'traffic-statistic',
        position: 1,
        link: '/statistic',
        key: 'statistic',
        icon: 'realtime-face',
      },
      {
        id: 'traffic-map',
        position: 2,
        link: '/map',
        key: 'statistic',
        icon: 'group-users',
      },
      {
        id: 'traffic-export',
        position: 3,
        link: '/export',
        key: 'statistic.map',
        icon: 'history',
      },
    ],
  },
];
