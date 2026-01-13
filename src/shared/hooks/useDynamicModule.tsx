import type { ComponentType } from 'react';
import { DynamicModuleLoader, type IModule } from 'redux-dynamic-modules-react';

// Curried HOC: useDynamicModule(getModule)(Component)

export const useDynamicModule = <TProps extends {} = {}>(...getModules: Array<() => IModule<any>>) => {
  return (Component: ComponentType<TProps>): ComponentType<TProps> => {
    const WrappedComponent = (props: TProps) => (
      <DynamicModuleLoader modules={getModules.map(fn => fn())}>
        <Component {...props} />
      </DynamicModuleLoader>
    );
    WrappedComponent.displayName = Component.displayName || Component.name || 'Component';
    return WrappedComponent;
  };
};

