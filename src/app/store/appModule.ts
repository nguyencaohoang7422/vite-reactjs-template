import { type ISagaModule } from 'redux-dynamic-modules-saga';
import appSaga from './appSaga';
import appReducer from './appSlice';

// Define module interface
export interface IAppState {
  app: ReturnType<typeof appReducer>;
}

// Module factory function
export function getAppModule(): ISagaModule<IAppState> {
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
    retained: true,
  };
}
