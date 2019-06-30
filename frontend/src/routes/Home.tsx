// tslint:disable-next-line: import-name
import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import { withAppContext, IAppContextInterface } from '../AppContext';
import { UserType } from 'dc2410-coursework-common';
import Unauthorised from '../routes/Unauthorised';
import AdoptionRequestsSection from '../components/AdoptionRequests/AdoptionRequestsSection';
import AdoptionRequestInternalCard from '../components/AdoptionRequests/AdoptionRequestInternalCard';
import AdoptionRequestPersonalCard from '../components/AdoptionRequests/AdoptionRequestPersonalCard';
import AnimalSummarySection from '../components/Animal/AnimalSummarySection';
import AnimalDetailsSection from '../components/Animal/AnimalDetailsSection';

class Home extends React.Component<{ AppContext?: IAppContextInterface }> {
  public render() {
    if (this.props.AppContext && !this.props.AppContext.user) {
      return <Unauthorised />;
    }

    return (
      <main className="container mt-3">
        <div className="row">
          <this.main />
          <this.side />
        </div>
      </main>
    );
  }

  private main = () => (
    <Router>
      <Switch>
        <Route path="/animal/:id" component={AnimalDetailsSection} />
        <Route path="/" component={AnimalSummarySection} />
        {/* TODO: 404 Page not found? */}
      </Switch>
    </Router>
  );

  private side = () =>
    this.props.AppContext!.user!.type === UserType.Internal ? (
      // For internal users allowing request to be responded, showing all.
      <AdoptionRequestsSection
        title="Adoption Requests"
        emptyMessge="No adoption requests have been made."
        cardClass={AdoptionRequestInternalCard}
      />
    ) : (
      // For public users showing only those they own.
      <AdoptionRequestsSection
        title="Your Adoption Requests"
        emptyMessge="You haven't made any adoption requests yet."
        cardClass={AdoptionRequestPersonalCard}
      />
    );
}

export default withAppContext(Home);
