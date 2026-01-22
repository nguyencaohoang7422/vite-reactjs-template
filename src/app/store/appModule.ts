import type { IModule } from '@/configs/reducerManager';
import appSaga from './appSaga';
import appReducer, { type AppState } from './appSlice';

// Define module interface

// Module factory function
export function getAppModule(): IModule<AppState> {
  return {
    // Module ID - unique identifier
    id: 'app',

    // Reducers map
    reducerMap: {
      app: appReducer,
    },

    // Sagas to run
    sagas: [appSaga],

    // Optional: actions to dispatch when module loads
    // initialActions: [],

    // Optional: cleanup khi module unmount
    // finalActions: [],

    // Optional: retain module khi unmount (default: false)
  };
}
