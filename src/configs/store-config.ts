import { applyMiddleware } from 'redux';
import { createStore as createDynamicStore, type IModuleStore } from 'redux-dynamic-modules';
import { createLogger } from 'redux-logger';
// Import initial reducers
import { getAppModule } from '@/app/store';
import { getAuthModule } from '@/features/auth';
import { getSagaExtension } from 'redux-dynamic-modules-saga';


// Cấu hình logger (chỉ trong development)
const logger = createLogger({
  // Collapse log groups
  collapsed: (_getState, _action, logEntry : any) => !logEntry.error,
  
  // Filter actions không muốn log
  predicate: (_getState, action) => {
    // Không log trong production
    if (!import.meta.env.DEV) return false;
    
    // Không log một số actions cụ thể
    const ignoredActions = ['@@redux-saga/SAGA_ACTION', '@@INIT'];
    return !ignoredActions.includes(action.type);
  },

  // Chỉ log state khác biệt
  diff: true,
  
  // Log duration
  duration: true,
  
  // Log timestamp
  timestamp: true,
  
  // Log level
  level: 'log',
  
  // Custom colors
  colors: {
    title: () => '#139BFE',
    prevState: () => '#1C5FAF',
    action: () => '#149945',
    nextState: () => '#A47104',
    error: () => '#ff0005',
  },

  // Transform action trước khi log
  actionTransformer: (action) => ({
    ...action,
    type: String(action.type),
  }),
  
  // Transform state trước khi log
  stateTransformer: (state) => state,

  // Error handling
  errorTransformer: (error) => error,
});
const sagaContext = {};
export const store: IModuleStore<any> = createDynamicStore(
  {
    // Initial state
    initialState: {},
    
    // Extensions - Saga extension để hỗ trợ dynamic sagas
    extensions: [
      getSagaExtension({
        context: sagaContext, // Saga context để share data giữa sagas
      }),
    ],
    enhancers: import.meta.env.DEV
      ? [applyMiddleware(logger)]
      : [],
  },
  // Initial modules
  getAppModule(),
  getAuthModule()
);

// Attach reducer manager và saga manager vào store
// để có thể inject/remove modules sau này
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
