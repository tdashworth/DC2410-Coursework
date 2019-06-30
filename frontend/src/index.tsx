// tslint:disable-next-line: import-name
import React from 'react';
// tslint:disable-next-line: import-name
import ReactDOM from 'react-dom';
import './index.css';

import { AppContextProvider } from './AppContext';
import NavBar from './components/NavBar';
import Home from './routes/Home';
import Session from './helpers/Session';
import API from './helpers/API';

import { User } from 'dc2410-coursework-common';

interface State {
  user?: User;
  setUser: (u: User) => void;
  wipeUser: () => void;
}

class App extends React.Component<{}, State> {
  public state: State = {
    setUser: (user) => this.setState({ user }),
    wipeUser: () => this.setState({ user: undefined }),
  };

  public componentDidMount = async () => {
    if (Session.isValid() && !this.state.user) {
      this.setState({ user: await API.users.profile() });
    }
  };

  public render = () => {
    const context = {
      user: this.state.user,
      setUser: this.state.setUser,
      wipeUser: this.state.wipeUser,
    };

    return (
      <AppContextProvider value={context}>
        <NavBar />
        <Home />
      </AppContextProvider>
    );
  };
}

ReactDOM.render(<App />, document.getElementById('root'));
