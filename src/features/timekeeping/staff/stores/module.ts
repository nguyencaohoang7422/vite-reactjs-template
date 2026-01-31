import type { IModule } from '@/configs/reducerManager';
import saga from './saga';
import reducer, { findTimekeepingShift, moduleName, pagination } from './slice.ts';
import type { State } from './type.ts';

export function getModule(): IModule<State> {
  return {
    id: moduleName,
    reducerMap: {
      [moduleName]: reducer,
    },
    initialActions: [pagination({ limit: 10, page: 1, searchText: '' }), findTimekeepingShift()],
    sagas: [saga],
  };
}
