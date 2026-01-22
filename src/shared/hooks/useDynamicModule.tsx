import type { IModuleStore } from '@/configs';
import type { IModule } from '@/configs/reducerManager';
import { type ComponentType, useEffect, useRef } from 'react';
import { useStore } from 'react-redux';

/**
 * Hook để tự động thêm và xóa module khi component mount/unmount
 * @param modules - Mảng các module cần load
 * @example
 * ```tsx
 * const MyComponent = () => {
 *   useDynamicModule([getModule()]);
 *   return <div>...</div>;
 * };
 * ```
 */
export function useDynamicModule(modules: IModule<any>[]) {
  const store = useStore() as IModuleStore;
  const loadedModules = useRef<string[]>([]);

  useEffect(() => {
    modules.forEach((module: IModule) => {
      if (!loadedModules.current.includes(module.id)) {
        store.addModule(module);
        loadedModules.current.push(module.id);
      }
    });

    return () => {
      modules.forEach((module: IModule) => {
        store.removeModule(module);
      });
      loadedModules.current = [];
    };
  }, [modules, store]);
}

/**
 * HOC để wrap component với dynamic module loading
 * @param modules - Mảng các module cần load
 * @example
 * ```tsx
 * export default withDynamicModule([getModule()])(MyComponent);
 * ```
 */
export function withDynamicModule(modules: IModule<any>[]) {
  return function <P extends object>(WrappedComponent: ComponentType<P>) {
    return function DynamicModuleWrapper(props: P) {
      useDynamicModule(modules);
      return <WrappedComponent {...props} />;
    };
  };
}
