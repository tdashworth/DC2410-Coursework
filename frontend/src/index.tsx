import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

import { AppContextProvider, IAppContextInterface } from './AppContext';
import NavBar from './components/NavBar';
import Error from './components/Error';
import Home from './routes/Home';
import Session from './helpers/Session';

class App extends React.Component<{}, IAppContextInterface> {
  public state: IAppContextInterface = {
    setUser: user => this.setState({ user }),
    wipeUser: () => this.setState({ user: undefined }),
    setError: error => this.setState({ error }),
    wipeError: () => this.setState({ error: undefined }),
  };

  public componentDidMount = async () => {
    if (Session.isValid() && !this.state.user) {
      this.setState({ user: Session.getUser() });
    }
  }

  public render = () => {
    const context = { ...this.state };

    return (
      <AppContextProvider value={context}>
        <NavBar />
        <Error />
        <Home />
      </AppContextProvider>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('root'));
