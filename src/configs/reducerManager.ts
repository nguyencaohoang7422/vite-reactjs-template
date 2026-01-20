// store/reducerManager.ts
import { combineReducers, type Action, type Reducer } from '@reduxjs/toolkit';

export interface IModule<TState = any> {
  id: string;
  reducerMap: {
    [key: string]: Reducer<any, Action>;
  };
  sagas?: any[];
  initialActions?: Action[];
  finalActions?: Action[];
}

export function createReducerManager(initialReducers: { [key: string]: Reducer }) {
  const reducers = { ...initialReducers };
  let combinedReducer = combineReducers(reducers);
  const keysToRemove: string[] = [];
  const loadedModules = new Set<string>();

  return {
    getReducerMap: () => reducers,
    
    reduce: (state: any, action: Action) => {
      if (keysToRemove.length > 0) {
        state = { ...state };
        keysToRemove.forEach((key) => delete state[key]);
        keysToRemove.length = 0;
      }
      return combinedReducer(state, action);
    },

    addModule: (module: IModule) => {
      if (loadedModules.has(module.id)) {
        return false;
      }

      // Add reducers từ module
      Object.entries(module.reducerMap).forEach(([key, reducer]) => {
        reducers[key] = reducer;
      });

      loadedModules.add(module.id);
      combinedReducer = combineReducers(reducers);
      return true;
    },

    removeModule: (module: IModule) => {
      if (!loadedModules.has(module.id)) {
        return false;
      }

      Object.keys(module.reducerMap).forEach((key) => {
        delete reducers[key];
        keysToRemove.push(key);
      });

      loadedModules.delete(module.id);
      combinedReducer = combineReducers(reducers);
      return true;
    },

    hasModule: (moduleId: string) => loadedModules.has(moduleId),
  };
}
