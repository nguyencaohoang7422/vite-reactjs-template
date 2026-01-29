import type { IModule } from '@/configs/reducerManager';
import saga from './saga.ts';
import reducer, { moduleName } from './slice.ts';
import type { State } from './type.ts';

export function getModule(): IModule<State> {
  return {
    id: moduleName,
    reducerMap: {
      [moduleName]: reducer,
    },
    initialActions: [],
    sagas: [saga],
  };
}
