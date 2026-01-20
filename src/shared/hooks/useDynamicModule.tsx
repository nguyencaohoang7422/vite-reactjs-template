import type { IModuleStore } from '@/configs';
import type { IModule } from '@/configs/reducerManager';
import { useEffect, useRef } from 'react';
import { useStore } from 'react-redux';

// Curried HOC: useDynamicModule(getModule)(Component)

// export const useDynamicModule = <TProps extends {} = {}>(...getModules: Array<() => IModule<any>>) => {
//   return (Component: ComponentType<TProps>): ComponentType<TProps> => {
//     const WrappedComponent = (props: TProps) => (
//       <DynamicModuleLoader modules={getModules.map(fn => fn())}>
//         <Component {...props} />
//       </DynamicModuleLoader>
//     );
//     WrappedComponent.displayName = Component.displayName || Component.name || 'Component';
//     return WrappedComponent;
//   };
// };
// // components/DynamicModuleLoader.tsx
// import { useEffect, useRef } from 'react';
// import { useStore } from 'react-redux';
// import { IModule, IModuleStore } from '@/store/store';

interface DynamicModuleLoaderProps {
  modules: IModule[];
  children: React.ReactNode;
}

export const useDynamicModule: React.FC<DynamicModuleLoaderProps> = ({
  modules,
  children ,
}) => {
  const store = useStore() as IModuleStore;
  const loadedModules = useRef<string[]>([]);

  useEffect(() => {
    // Load modules khi component mount
    modules.forEach((module: any) => {
      if (!loadedModules.current.includes(module.id)) {
        store.addModule(module);
        loadedModules.current.push(module.id);
      }
    });

    // Cleanup: remove modules khi component unmount
    return () => {
      modules.forEach((module:any) => {
        store.removeModule(module);
      });
      loadedModules.current = [];
    };
  }, [modules, store]);

  return <>{children}</>;
};


