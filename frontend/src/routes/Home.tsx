import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import { withAppContext, IAppContextInterface } from '../AppContext';
import Unauthorised from '../routes/Unauthorised';
import Animal from './Animal';
import Listings from './Listings';
import PageNotFound from './PageNotFound';

class Home extends React.Component<{ AppContext?: IAppContextInterface }> {
  public render() {
    if (!this.props.AppContext!.user) {
      return <Unauthorised />;
    }

    return (
      <Router>
        <Switch>
          <Route path="/" exact={true} component={Listings} />
          <Route path="/animal/:id" component={Animal} />
          <Route component={PageNotFound} />
        </Switch>
      </Router>

    );
  }
}

export default withAppContext(Home);
