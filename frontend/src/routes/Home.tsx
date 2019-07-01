// tslint:disable-next-line: import-name
import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import { withAppContext, IAppContextInterface } from '../AppContext';
import Unauthorised from '../routes/Unauthorised';
import Animal from './Animal';
import Listings from './Listings';

class Home extends React.Component<{ AppContext?: IAppContextInterface }> {
  public render() {
    if (this.props.AppContext && !this.props.AppContext.user) {
      return <Unauthorised />;
    }

    return (
      <Router>
        <Switch>
          <Route path="/animal/:id" component={Animal} />
          <Route path="/" component={Listings} />
          {/* TODO: 404 Page not found? */}
        </Switch>
      </Router>

    );
  }
}

export default withAppContext(Home);
