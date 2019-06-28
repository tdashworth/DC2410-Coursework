// tslint:disable-next-line: import-name
import React from 'react';
import { User } from 'dc2410-coursework-common';

export interface IAppContext {
  user?: User;
  setUser: (u: User) => void;
  wipeUser: () => void;
}

// tslint:disable-next-line: variable-name
const AppContext = React.createContext<IAppContext | null>(null);

// tslint:disable-next-line: variable-name
export const AppContextProvider = AppContext.Provider;
// tslint:disable-next-line: variable-name
export const AppContextConsumer = AppContext.Consumer;

export function withAppContext<P extends { AppContext?: IAppContext }>(
  // tslint:disable-next-line: variable-name
  Component: React.ComponentClass<P> | React.StatelessComponent<P>,
): React.FC<P> {
  return function BoundComponent(props: P) {
    return (
      <AppContextConsumer>
        {value => <Component {...props} AppContext={value!} />}
      </AppContextConsumer>
    );
  };
}
