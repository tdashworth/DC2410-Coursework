import React from 'react';
import { IUser } from 'dc2410-coursework-common';

export interface IAppContextInterface {
  user?: IUser;
  setUser: (u: IUser) => void;
  wipeUser: () => void;
  error?: Error;
  setError: (e: Error) => void;
  wipeError: () => void;
}

// tslint:disable-next-line: variable-name
const AppContext = React.createContext<IAppContextInterface | null>(null);

// tslint:disable-next-line: variable-name
export const AppContextProvider = AppContext.Provider;
// tslint:disable-next-line: variable-name
export const AppContextConsumer = AppContext.Consumer;

export function withAppContext<P extends { AppContext?: IAppContextInterface }>(
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
