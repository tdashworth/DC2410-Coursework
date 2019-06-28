// tslint:disable-next-line: import-name
import React from "react";
import "./App.css";

import { AppContextProvider } from "./AppContext";
import NavBar from "./components/NavBar";
import Home from "./routes/Home";
import { isSessionValid } from "./helpers/session";
import { getUserProfile } from "./helpers/api";
import { User } from "dc2410-coursework-common";

interface State {
  user?: User;
  setUser: (u: User) => void;
  wipeUser: () => void;
}

class App extends React.Component<{}, State> {
  public state: State = {
    setUser: user => this.setState({ user }),
    wipeUser: () => this.setState({ user: undefined })
  };

  public componentDidMount = async () => {
    if (isSessionValid()) {
      this.setState({ user: await getUserProfile() });
    }
  };

  public render = () => {
    const context = {
      user: this.state.user,
      setUser: this.state.setUser,
      wipeUser: this.state.wipeUser
    };

    return (
      <AppContextProvider value={context}>
        <NavBar />
        <Home />
      </AppContextProvider>
    );
  };
}

export default App;
