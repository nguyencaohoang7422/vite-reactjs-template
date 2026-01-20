// store/sagaManager.ts
import type { SagaMiddleware, Task } from 'redux-saga';

export function createSagaManager(sagaMiddleware: SagaMiddleware) {
  const runningSagas = new Map<string, Task[]>();

  return {
    runModuleSagas: (moduleId: string, sagas: any[]) => {
      if (runningSagas.has(moduleId)) {
        return;
      }

      const tasks = sagas.map((saga) => sagaMiddleware.run(saga));
      runningSagas.set(moduleId, tasks);
    },

    cancelModuleSagas: (moduleId: string) => {
      const tasks = runningSagas.get(moduleId);
      if (tasks) {
        tasks.forEach((task) => task.cancel());
        runningSagas.delete(moduleId);
      }
    },

    hasSagas: (moduleId: string) => runningSagas.has(moduleId),
  };
}
