// tslint:disable-next-line: import-name
import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Unauthorised from "../routes/Unauthorised";
import Authorised from "../routes/Authorised";
import { withAppContext, IAppContext } from "../AppContext";
import Animal from "./Animal";

class Home extends React.Component<{ AppContext?: IAppContext }> {
  public render() {
    if (this.props.AppContext && !this.props.AppContext.user)
      return <Unauthorised />;

    return (
      <Router>
        <Switch>
          <Route path="/animal/:id" component={Animal} />
          <Route path="/" component={Authorised} />
        </Switch>
      </Router>
    );
  }
}

export default withAppContext(Home);
