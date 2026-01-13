import 'redux-dynamic-modules-react';

declare module 'redux-dynamic-modules-react' {
  export interface IDynamicModuleLoaderProps {
    /** Explicitly add children to support React 18+ and React 19+ */
    children?: React.ReactNode;
  }
}