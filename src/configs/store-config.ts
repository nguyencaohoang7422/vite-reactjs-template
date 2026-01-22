// store/store.ts
import { getAppModule } from '@/app/store';
import { getAuthModule } from '@/auth';
import { configureStore, Tuple } from '@reduxjs/toolkit';
import { createLogger } from 'redux-logger';
import createSagaMiddleware from 'redux-saga';
import { createReducerManager, type IModule } from './reducerManager';
import { createSagaManager } from './sagaManager';

// Cấu hình logger (chỉ trong development)
const logger = createLogger({
  collapsed: (_getState, _action, logEntry: any) => !logEntry.error,

  predicate: (_getState, action) => {
    //
    if (!import.meta.env.DEV) return false;
    const ignoredActions = ['@@INIT'];
    return !ignoredActions.includes(action.type);
  },

  diff: true,
  duration: true,
  timestamp: true,
  level: 'log',

  colors: {
    title: () => '#139BFE',
    prevState: () => '#1C5FAF',
    action: () => '#149945',
    nextState: () => '#A47104',
    error: () => '#ff0005',
  },

  actionTransformer: (action) => ({
    ...action,
    type: String(action.type),
  }),

  stateTransformer: (state) => state,
  errorTransformer: (error) => error,
});

// Tạo saga middleware với context
const sagaContext = {};
const sagaMiddleware = createSagaMiddleware({ context: sagaContext });

// Load initial modules
const appModule = getAppModule();
const authModule = getAuthModule();

// Tạo reducer manager với initial reducers
const initialReducers = {
  ...appModule.reducerMap,
  ...authModule.reducerMap,
};

const reducerManager = createReducerManager(initialReducers);
const sagaManager = createSagaManager(sagaMiddleware);

// Tạo store
type ExtendedStore = IModuleStore & {
  reducerManager: typeof reducerManager;
  sagaManager: typeof sagaManager;
};

export const store = configureStore({
  reducer: reducerManager.reduce,
  middleware: () => new Tuple(sagaMiddleware, ...(import.meta.env.DEV ? [logger] : [])),
  devTools: import.meta.env.DEV,
}) as ExtendedStore;

// Attach managers vào store
store.reducerManager = reducerManager;
store.sagaManager = sagaManager;

// Run initial sagas
if (appModule.sagas) {
  sagaManager.runModuleSagas(appModule.id, appModule.sagas);
}
if (authModule.sagas) {
  sagaManager.runModuleSagas(authModule.id, authModule.sagas);
}

// Dispatch initial actions
if (appModule.initialActions) {
  appModule.initialActions.forEach((action) => store.dispatch(action));
}
if (authModule.initialActions) {
  authModule.initialActions.forEach((action) => store.dispatch(action));
}

// Helper function để add module động
store.addModule = <TState = any>(module: IModule<TState>) => {
  const isNew = reducerManager.addModule(module);

  if (isNew) {
    // Replace reducer
    store.replaceReducer(reducerManager.reduce);

    // Run sagas nếu có
    if (module.sagas && module.sagas.length > 0) {
      sagaManager.runModuleSagas(module.id, module.sagas);
    }

    // Dispatch initial actions
    if (module.initialActions) {
      module.initialActions.forEach((action: any) => store.dispatch(action));
    }
  }
};

// Helper function để remove module
store.removeModule = <TState = any>(module: IModule<TState>) => {
  const removed = reducerManager.removeModule(module);

  if (removed) {
    // Dispatch final actions
    if (module.finalActions) {
      module.finalActions.forEach((action) => store.dispatch(action));
    }

    // Cancel sagas
    sagaManager.cancelModuleSagas(module.id);

    // Replace reducer
    store.replaceReducer(reducerManager.reduce);
  }
};

// Types
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export interface IModuleStore<TState = any> extends ReturnType<typeof configureStore> {
  reducerManager: ReturnType<typeof createReducerManager>;
  sagaManager: ReturnType<typeof createSagaManager>;
  addModule: (module: IModule<TState>) => void;
  removeModule: (module: IModule<TState>) => void;
}

export default store;
